export class Event {
  readonly subject: string;
  readonly data: any;
}

export interface EventStore {
  save: (event: Event) => Promise<void>;
}
