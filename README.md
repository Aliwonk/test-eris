# Задание

> Необходимо создать небольшое приложение, состоящее из двух страниц: Home и History. Реализация "постраничной" бесконечной загрузки данных и их последующее форматирование.

**Требования:**

- Приложение организуем в директории frontend
- TypeScript
- React без использования классовых компонентов
- React hooks
- React router
- Redux
- Redux-Saga
- Адаптивная верстка
- Отсутствие css фреймворков (Tailwind, Bootstrap, и т.д.)
- Отсутствие styled компонентов
- Ширина контента 970px
- Желательно максимально попасть по макету (Да, он картинкой)

## Макет

В корне два файла: desktop.jpg и mobile.jpg (<768px).

Вверху страницы добавить любое меню для перехода между страницами.

### Home Page

Никаких требований нет. Нужна просто для организации роутинга. Можно забить любым кастомным контентом на ваш вкус.

### History Page

Создать таблицу согласно макету, детали строк в которой подгружается по 15 строк. Весь список данных располагается в `backend/data` директории.

При загрузке страницы загружаем список всех эвентов. Метод `events`. Один эвент одна строка.

Изучите расположение данных в таблице на макете. Строки необходимо группировать по аппоинтментам и отсортировать по дате. Эвенты у которых есть appointmentId необходимо расположить после эвента с name `Appointment` и с этим Id (см. строку с details 1-1 with Provider).

Эвенты без appointmentId располагаются просто по дате в общей истории.

Было

| Name                              | Date           |
|-------------	                    |--------------	 |
| Observation                       | Mar 22, 2022   |
| Condition                         | Mar 28, 2022   |
| CarePlan                          | Apr 12, 2022   |
| Observation                       | Mar 28, 2022   |
| Medication                        | Mar 28, 2022   |
| Appointment                       | Mar 22, 2022   |
| Appointment                       | Mar 28, 2022   |
| Observation                       | Mar 22, 2022   |
| Condition                         | Mar 28, 2022   |
| Observation (Без AppointmentId)   | Mar 25, 2022   |

Стало

| Name                              | Date           |
|-------------	                    |--------------	 |
| Appointment                       | Mar 28, 2022   |
| Observation                       | Mar 28, 2022   |
| Condition                         | Mar 28, 2022   |
| Condition                         | Mar 28, 2022   |
| Medication                        | Mar 28, 2022   |
| Observation (без AppointmentId)   | Mar 25, 2022   |
| Appointment                       | Mar 22, 2022   |
| CarePlan                          | Apr 12, 2022   |
| Observation                       | Mar 22, 2022   |
| Observation                       | Mar 22, 2022   |

Так же визуально происходит группировка по имени эвента (name) и дате. Значит между строками не будет бордера. Если имя эвента одинаковое, а даты разные - это разные группы, бордер есть.

Реализовать infinite scroll. По мере скроллинга нужно подгружать детальные данные для `events` отдаваемые бэком в методе `resources`. На момент загрузки отображаем какой-нибудь индикатор загрузки.

Отображение колонки Details ограничьте тремя строками.

Ресурсы могут иметь или не иметь values. Если values > 1 отобразить через запятую.

При выходе со страницы истории загруженные данные в сторе должны быть очищены.

## Результат:
Ожидается таблица структурно похожая на макет. Данные для макета использованы практически те же что и в тестовых данных которыми вы будете оперировать.

## Backend:

Старт тестового бэкенда:

```
cd ./backend
npm/yarn install
node index.js
```

Методы:

Получение списка эвентов.

```
POST: http://localhost:5000/vents
```

Получение данных по ресурсам. В параметрах нужно передать ids со списком id ресурсов.

```
POST: http://localhost:5000/resources
```
