import { useState, useEffect } from 'react';

export function useNow() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(new Date());
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  return { now, curHour: now.getHours() };
}
