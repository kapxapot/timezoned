import { Clock, ClockChange, IClock } from "@/lib/clock";
import { merge } from "@/lib/common";
import { Dispatch } from "react";

export type DispatchAction =
  { type: "Set"; clocks: IClock[] } |
  { type: "Add" | "Delete"; clock: IClock } |
  { type: "AddTimeZone"; timeZone: string } |
  { type: "Edit"; clock: IClock; change: ClockChange };

export interface AppContextType {
  timeZones: string[];
  activeTimeZones: string[];
  defaultClock: IClock | null;
  customClocks: IClock[];
  dispatch: Dispatch<DispatchAction>;
}

export const initialCustomClocks: IClock[] = [];

export function customClocksReducer(clocks: IClock[], action: DispatchAction): IClock[] {
  switch (action.type) {
    case "Set":
      return [...action.clocks];

    case "Add":
      return [...clocks, action.clock];

    case "AddTimeZone":
      return [...clocks, new Clock(action.timeZone)];

    case "Edit":
      return clocks.map(clock => {
        return clock === action.clock
          ? merge(clock, action.change)
          : clock;
      });

    case "Delete":
      return clocks.filter(clock => clock !== action.clock);
  }
}
