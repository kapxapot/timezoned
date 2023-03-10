import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Flowbite, Footer, Navbar } from 'flowbite-react';
import { save, load } from '@/lib/storage';
import { sortedTimeZones } from '@/lib/timezones';
import { flowbiteTheme } from '@/components/config/flowbite-theme';
import { ClockCard } from '@/components/clock-card';
import AddClock from '@/components/add-clock';
import { StaticClockCard } from '@/components/static-clock-card';
import { merge } from '@/lib/common';
import { Clock, ClockChange, IClock } from '@/lib/clock';
import { TimeZone } from "@vvo/tzdb";
import QuickTimeline from '@/components/quick-timeline';
import TimeParser from '@/components/time-parser';
import Image from 'next/image';
import Script from 'next/script';

export default function Home() {
  const [clocks, setClocks] = useState<IClock[]>([]);
  const [timeZones] = useState<TimeZone[]>(sortedTimeZones);

  const now = new Date();

  const filteredTimeZones = timeZones.filter(
    tz => !clocks.some(clock => clock.timeZone === tz.name)
  );

  const localClockLabel = "My time";
  const localClock = clocks.find(clock => clock.default);
  const otherClocks = filterOtherClocks(clocks);

  function filterOtherClocks(clocks: IClock[]): IClock[] {
    return clocks.filter(clock => !clock.default);
  }

  function addParsedClock(timeZone: string) {
    addClock(new Clock(timeZone));
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
      localClockLabel,
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
        <link rel="icon" type="image/svg+xml" href="/tz.svg" />
      </Head>

      <div className="flex flex-col h-screen">
        <nav className="mb-5">
          <Navbar
          >
            <Navbar.Brand>
              <picture>
                <img
                  src="/tz.svg"
                  className="mr-3 h-6 sm:h-9"
                  alt="Timezoned Logo"
                />
              </picture>
              <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                Timezoned
              </span>
            </Navbar.Brand>

            <div className="flex flex-wrap justify-center gap-3 mt-3 sm:mt-0">
              <AddClock
                timeZones={filteredTimeZones}
                addClock={addClock}
              />
              {localClock && (
                <>
                  <QuickTimeline
                    timeZoneNames={timeZones.map(tz => tz.name)}
                    baseTimeZone={localClock.timeZone}
                    baseTitle={localClock.title}
                  />

                  <TimeParser
                    timeZones={filteredTimeZones}
                    baseTimeZone={localClock.timeZone}
                    onAddClock={addParsedClock}
                  />
                </>
              )}
            </div>
          </Navbar>
        </nav>

        <main className="grow">
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

        <footer className="w-full p-3 bg-white border-t border-gray-200 shadow flex gap-2 items-center justify-between dark:bg-gray-800 dark:border-gray-600">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <div>
              All rights reserved. &copy; 2023{now.getFullYear() > 2023 && (`—${now.getFullYear()}`)} <a href="https://timezoned.vercel.app" className="font-semibold hover:underline">Timezoned</a>
            </div>
            <div>
              Created by <a href="https://about.me/kapxapot" className="font-semibold hover:underline">Sergey Atroshchenko</a>
            </div>
          </div>
          <div>
            <a href="https://github.com/kapxapot/timezoned" className="opacity-50 hover:opacity-100">
              <picture>
                <img
                  src="/github.svg"
                  className="w-6"
                  alt="GitHub link"
                />
              </picture>
            </a>
          </div>
        </footer>
      </div>
      <script
        async
        data-name="BMC-Widget"
        data-cfasync="false"
        src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
        data-id="kapxapot"
        data-description="Support me on Buy me a coffee!"
        data-message="Thank you for visiting! If you liked this page you can buy me a coffee!"
        data-color="#BD5FFF"
        data-position="Right"
        data-x_margin="10"
        data-y_margin="75"
      />
    </Flowbite>
  )
}
