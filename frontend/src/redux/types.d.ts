namespace Counters {
  export type FetchInitialState = {
    isLoading: boolean;
    resources: Array<Resource>;
    events: Array<EventResource>;
  };
  
  export type Resource = {
    id: string;
    details: string;
    values: Array<string>;
    code: string;
  };

  export type EventResource = {
    id: string | "";
    appointmentId: string | "";
    name: string | "";
    resource: Resource;
    date: Date;
  };
}
