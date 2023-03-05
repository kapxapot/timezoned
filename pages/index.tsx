import Head from 'next/head';
import { Flowbite } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { TimeZone } from "@vvo/tzdb";
import { save, load } from '@/lib/storage';
import { sortedTimeZones } from '@/lib/timezones';
import { ClockCard } from '@/components/clock-card';
import { flowbiteTheme } from '@/components/flowbite-theme';
import AddClock from '@/components/add-clock';
import { Clock, ClockChange, IClock } from '@/lib/clock';
import { merge } from '@/lib/common';

export default function Home() {
  const [clocks, setClocks] = useState<IClock[]>([]);
  const [timeZones] = useState<TimeZone[]>(sortedTimeZones);

  const filteredTimeZones = timeZones.filter(
    tz => !clocks.some(clock => clock.timeZone === tz.name)
  );

  function notDefaultClocks(clocks: IClock[]): IClock[] {
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
    save("clocks", notDefaultClocks(clocks));

    setClocks(clocks);
  }

  function loadClocks(): IClock[] {
    const clocks = load<any[]>("clocks") ?? [];

    return clocks.map(obj => Clock.deserialize(obj));
  }

  useEffect(() => {
    const storedClocks = notDefaultClocks(
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

      <nav className="flex space-x-2 justify-center mt-5">
        <AddClock
          timeZones={filteredTimeZones}
          addClock={addClock}
        />
      </nav>

      <main className="flex flex-wrap justify-center items-start p-5 gap-6 mt-2">
        {clocks.map(clock => (
          <ClockCard
            clock={clock}
            key={clock.id}
            onDelete={deleteClock}
            onEdit={editClock}
            timeZones={filteredTimeZones}
          />
        ))}
      </main>
    </Flowbite>
  )
}
