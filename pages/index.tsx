import Head from 'next/head';
import { Flowbite } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { TimeZone } from "@vvo/tzdb";
import { save, load } from '@/lib/storage';
import { sortedTimeZones } from '@/lib/timezones';
import { ClockCard } from '@/components/clock-card';
import { flowbiteTheme } from '@/components/config/flowbite-theme';
import AddClock from '@/components/add-clock';
import { Clock, ClockChange, IClock } from '@/lib/clock';
import { merge } from '@/lib/common';
import { StaticClockCard } from '@/components/static-clock-card';

export default function Home() {
  const [clocks, setClocks] = useState<IClock[]>([]);
  const [timeZones] = useState<TimeZone[]>(sortedTimeZones);

  const filteredTimeZones = timeZones.filter(
    tz => !clocks.some(clock => clock.timeZone === tz.name)
  );

  const localClock = clocks.find(clock => clock.default);
  const otherClocks = filterOtherClocks(clocks);

  function filterOtherClocks(clocks: IClock[]): IClock[] {
    return clocks.filter(clock => !clock.default);
  }

  function addClock(clock: IClock) {
    updateClocks([...clocks, clock]);
  }

  function editClock(editedClock: IClock, change: ClockChange) {
    const updatedClocks = clocks.map(clock => {
      return clock === editedClock
        ? merge(clock, change)
        : clock;
    });

    updateClocks(updatedClocks);
  }

  function deleteClock(deletedClock: IClock) {
    updateClocks(
      clocks.filter(clock => clock !== deletedClock)
    );
  }

  function updateClocks(clocks: IClock[]) {
    save("clocks", filterOtherClocks(clocks));

    setClocks(clocks);
  }

  function loadClocks(): IClock[] {
    const clocks = load<any[]>("clocks") ?? [];

    return clocks.map(obj => Clock.deserialize(obj));
  }

  useEffect(() => {
    const storedClocks = filterOtherClocks(
      loadClocks()
    );

    const localClock = new Clock(
      Intl.DateTimeFormat().resolvedOptions().timeZone,
      "Local",
      true
    );

    setClocks([localClock, ...storedClocks]);
  }, []);

  return (
    <Flowbite theme={flowbiteTheme}>
      <Head>
        <title>Timezoned</title>
        <meta name="description" content="Timezone helper" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="flex justify-center my-5">
        <AddClock
          timeZones={filteredTimeZones}
          addClock={addClock}
        />
      </nav>

      <main>
        {localClock && (
          <div className="flex justify-center mb-5">
            <StaticClockCard
              clock={localClock}
            />
          </div>
        )}
        <div className="flex flex-wrap justify-center mx-5 mb-5 gap-5">
          {otherClocks.map(clock => (
            <ClockCard
              clock={clock}
              defaultClock={localClock}
              key={clock.id}
              onDelete={deleteClock}
              onEdit={editClock}
              timeZones={filteredTimeZones}
            />
          ))}
        </div>
      </main>
    </Flowbite>
  )
}
