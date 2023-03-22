export interface ITime {
  hours: number;
  minutes: number;
  readonly isEmpty: boolean;
}

export class Time implements ITime {
  public readonly hours: number = 0;
  public readonly minutes: number = 0;

  constructor(hours: number = 0, minutes: number = 0) {
    this.hours = hours;
    this.minutes = minutes;
  }

  get isEmpty(): boolean {
    return this.hours === 0 && this.minutes === 0;
  }
}
