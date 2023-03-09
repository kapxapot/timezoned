import {v4 as uuidv4} from 'uuid';
import { extractCity } from './timezones';

export interface IClock {
  timeZone: string;
  title: string;
  default: boolean;
  id: string;
}

export interface ClockChange {
  timeZone: string;
  title: string;
}

export class Clock implements IClock {
  public timeZone: string;
  public title: string;
  public default = false;
  public id: string;

  constructor(timeZone: string, title?: string, def?: boolean, id?: string) {
    this.timeZone = timeZone;
    this.title = title ? title : extractCity(timeZone);

    if (def) {
      this.default = def;
    }

    this.id = id ?? uuidv4();
  }

  static deserialize(obj: any): IClock {
    return new Clock(obj.timeZone, obj.title, obj.default, obj.id);
  }

  static fromChange(change: ClockChange): IClock {
    return new Clock(change.timeZone, change.title);
  }
}
