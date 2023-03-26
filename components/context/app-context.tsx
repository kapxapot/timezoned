import { Clock, IClock } from "@/lib/clock";
import { load, save } from "@/lib/storage";
import { sortedTimeZones } from "@/lib/timezones";
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { ActionType, AppContextType, customClocksReducer, initialCustomClocks } from "./app-reducer";

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: PropsWithChildren) => {
  const storageKey = "clocks";

  const [defaultClock, setDefaultClock] = useState<IClock | null>(null);
  const [customClocks, dispatch] = useReducer(customClocksReducer, initialCustomClocks);

  const allClocks = useMemo(() => {
    return defaultClock
      ? [defaultClock, ...customClocks]
      : customClocks;
  }, [defaultClock, customClocks]);

  // all timezones
  const timeZones = useMemo(() => sortedTimeZones, []);

  // timezones of the clocks on the dashboard
  const activeTimeZones = useMemo(() => {
    return timeZones.filter(
      tz => allClocks.some(clock => clock.timeZone === tz.name)
    )
  }, [timeZones, allClocks]);

  const timeZoneNames = useMemo(
    () => timeZones.map(tz => tz.name),
    [timeZones]
  );

  const activeTimeZoneNames = useMemo(
    () => activeTimeZones.map(tz => tz.name),
    [activeTimeZones]
  );

  useEffect(() => {
    setDefaultClock(
      new Clock(
        Intl.DateTimeFormat().resolvedOptions().timeZone,
        "My time",
        true
      )
    );

    const rawClocks = load<any[]>(storageKey) ?? [];

    if (!rawClocks.length) {
      return;
    }

    const clocks = rawClocks.map(obj => Clock.deserialize(obj));

    dispatch({
      type: ActionType.Set,
      payload: { clocks }
    });
  }, []);

  useEffect(() => {
    if (customClocks !== initialCustomClocks) {
      save(storageKey, customClocks);
    }
  }, [customClocks]);

  const contextValue: AppContextType = useMemo(() => {
    return {
      timeZones: timeZoneNames,
      activeTimeZones: activeTimeZoneNames,
      defaultClock,
      customClocks,
      dispatch
    };
  }, [timeZones, activeTimeZones, defaultClock, customClocks, dispatch]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext() must be called within AppProvider.");
  }

  return context;
}
