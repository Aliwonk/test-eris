import { useEffect, useState } from "react";
import { getEvents, getResources } from "../redux/counters/fetchCounters";
import { useAppDispatch, useAppSelector } from "../redux/reduxHooks"
import '../styles/History.css';

type Data = {
    // может быть данные resource или events

    element?: Counters.Resource & Counters.EventResource;

    // детали appоintment

    appointment?: string;

    // можеть быть дата appointment,
    // если не будет appointment, то дата event,
    // чтобы в будущем удобно было сортировать по дате

    date: Date | string;
}

export default function HistoryPage() {
    const { isLoading } = useAppSelector(state => state.fetch);
    const dispatch = useAppDispatch();
    const [events, setEvents] = useState<Array<Counters.EventResource>>([]);
    const [resources, setResources] = useState<Array<Counters.Resource>>([]);
    const [data, setData] = useState<Array<Data>>([]);
    const [lengthData, setLengthData] = useState<number>(35)
    const [fetching, setFetching] = useState(false);
    let [current, setCurrent] = useState<number>(30);

    useEffect(() => {

        // отправляем запросы на сервер через fetch

        dispatch(getEvents()).then(res => {
            setEvents(res.payload)
        });
        dispatch(getResources()).then(res => {
            setResources(res.payload);
        })

        document.addEventListener('scroll', scrollHandler);
        return function () {
            document.removeEventListener('scroll', scrollHandler);
        }

    }, [current]);

    useEffect(() => {
        const data = sortData(events, resources, current);
        setData(data)
    }, [events]);


    const scrollHandler = (e: any) => {
        const { scrollHeight, scrollTop } = e.target.documentElement;
        if (scrollHeight - (scrollTop + window.innerHeight) < 60 && data.length < lengthData - 24) {
            setCurrent(current += 5);
        }

        if (data.length === lengthData) {
            setCurrent(lengthData);
        }
    }

    function sortData(
        events: Array<Counters.EventResource>,
        resources: Array<Counters.Resource>,
        current: number,
    ) {
        // Общий массив со всеми получившими данными

        const commonData: Array<Data> = [];

        // перебираме все events

        events.forEach(event => {
            let dataElement: any = {};

            if (event.appointmentId) {

                // перебираем events второй раз, чтобы получить events с названием Appointment

                events.forEach(event2 => {

                    // получаем event с названием Appointment по appintmentId

                    if (event2.id === event.appointmentId) {


                        // получем resource 

                        resources.forEach((resource) => {

                            // получаем детали appointment

                            if (`Appointment/${event2.id}` === resource.id) {
                                dataElement.appointment = resource.details;
                                dataElement.date = event2.date;
                            }

                            // получаем детали resource

                            if (resource.id === `${event.name}/${event.id}`) {
                                dataElement.element = {
                                    ...event,
                                    resource,
                                }
                                dataElement.date = event.date;

                                // записываем полученные данные в общий массив

                                commonData.push({
                                    ...dataElement,
                                });

                            }
                        });

                    };
                })

            } else {

                // Если appointmentId нет, получем только resource

                resources.forEach(resource => {
                    if (resource.id === `${event.name}/${event.id}`) {
                        dataElement.element = {
                            ...event,
                            resource
                        }
                        dataElement.date = event.date;
                    }
                })

                // записываем полученные даннные в общий массив

                commonData.push({ ...dataElement })
            }

        });

        // Сортируем данные по дате

        const sortDataByDate = commonData.sort((a: Data, b: Data) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        setLengthData(sortDataByDate.length);

        // Отдаем данные по указанному числу
        let result: Array<Data> = [];

        for (let i = 0; i < current; i++) {
            result.push(sortDataByDate[i]);
        }

        return result;

    }

    return (
        <div className="table">
            <div className="tableCaption">
                <div className="rows row-1">
                    <p className="rowEventType">Event type</p>
                    <p className="rowDetails">Details</p>
                </div>
                <div className="rows row-2">
                    <p className="rowCode">Code</p>
                    <p className="rowDate">Date</p>
                </div>
            </div>
            <div className="tableValue">
                {data.map((value, index) => {
                    const { element, date } = value || '';
                    let colorEventType = '';
                    switch (element?.name) {
                        case 'Appointment':
                            colorEventType = '#a77bff';
                            break;
                        case 'Observation':
                            colorEventType = '#6feee7';
                            break;
                        case 'CarePlan':
                            colorEventType = '#e0a6fe';
                            break;
                        case 'MedicationStatement':
                            colorEventType = '#d0f57b';
                            break;
                        case 'AllergyIntolerance':
                            colorEventType = '#73efb5';
                            break;
                        case 'Condition':
                            colorEventType = '#ff8ac7';
                            break;
                        case 'Immunization':
                            colorEventType = '#6afa6f';
                            break;
                    }

                    return (
                        <div className="valuesRow" key={index}>
                            <div className="rows row-1">
                                <div className="rowEventType">
                                    <p style={{
                                        width: 'fit-content',
                                        borderRadius: 7 + 'px',
                                        border: '1px solid #d0d0d0',
                                        padding: 4 + 'px',
                                        backgroundColor: colorEventType
                                    }}>{element?.name}</p>
                                </div>
                                <div className="rowDetails">
                                    <p>{element?.resource.details} {
                                        (
                                            typeof element?.resource.values !== 'undefined' &&
                                            element?.resource.values.length !== 0
                                        )
                                        &&
                                        `: ${element?.resource.values.map((value: any) => {
                                            if (value.value && value.unit) return `${value.value} ${value.unit}`
                                            return value;
                                        })}`
                                    }</p>
                                </div>
                            </div>

                            <div className="rows row-2">
                                <div className="rowCode">
                                    {/* Observation/62419a7bed9297df2994456b code === 'pink eye' */}
                                    <p>{element?.resource.code}</p>
                                </div>
                                <div className="rowDate">
                                    <p>{typeof date !== 'undefined' && date.toString().split('T')[0]}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {isLoading && <p>Loading</p>}
            </div>
        </div>
    )
}