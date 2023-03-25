import { Clock, IClock } from "@/lib/clock";
import { merge } from "@/lib/common";
import { Dispatch } from "react";

export enum ActionType {
  Set = "Set",
  Add = "Add",
  AddTimeZone = "AddTimeZone",
  Edit = "Edit",
  Delete = "Delete"
}

export interface DispatchAction {
  type: ActionType;
  payload: any;
}

export interface AppContextType {
  timeZones: string[];
  activeTimeZones: string[];
  defaultClock: IClock | null;
  customClocks: IClock[];
  dispatch: Dispatch<DispatchAction>;
}

export const initialCustomClocks: IClock[] = [];

export function customClocksReducer(clocks: IClock[], action: DispatchAction): IClock[] {
  const { type, payload } = action;

  switch (type) {
    case ActionType.Set:
      return [
        ...payload.clocks
      ];

    case ActionType.Add:
      return [
        ...clocks,
        payload.clock
      ];

    case ActionType.AddTimeZone:
      return [
        ...clocks,
        new Clock(payload.timeZone)
      ];

    case ActionType.Edit:
      return clocks.map(clock => {
        return clock === payload.clock
          ? merge(clock, payload.change)
          : clock;
      });

    case ActionType.Delete:
      return clocks.filter(clock => clock !== payload.clock);
  }
}
