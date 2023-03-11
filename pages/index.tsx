import { useEffect, useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { Flowbite, Navbar } from 'flowbite-react';
import { merge } from '@/lib/common';
import { Clock, ClockChange, IClock } from '@/lib/clock';
import { save, load } from '@/lib/storage';
import { sortedTimeZones } from '@/lib/timezones';
import { flowbiteTheme } from '@/components/config/flowbite-theme';
import { ClockCard } from '@/components/clock-card';
import AddClock from '@/components/add-clock';
import { StaticClockCard } from '@/components/static-clock-card';
import QuickTimeline from '@/components/quick-timeline';
import TimeConverter from '@/components/time-converter';
import Footer from '@/components/footer';
import { TimeZone } from "@vvo/tzdb";
import { ClockIcon } from '@heroicons/react/20/solid';

export default function Home() {
  const [clocks, setClocks] = useState<IClock[]>([]);
  const [timeZones] = useState<TimeZone[]>(sortedTimeZones);

  const filteredTimeZones = timeZones.filter(
    tz => !clocks.some(clock => clock.timeZone === tz.name)
  );

  const localClockLabel = "My time";
  const localClock = clocks.find(clock => clock.default);
  const otherClocks = filterOtherClocks(clocks);

  function filterOtherClocks(clocks: IClock[]): IClock[] {
    return clocks.filter(clock => !clock.default);
  }

  function addTimeZoneClock(timeZone: string) {
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

      <article className="flex flex-col min-h-screen gap-5">
        <nav>
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

            <Navbar.Toggle />
            <Navbar.Collapse
              className="items-center"
            >
              <AddClock
                timeZones={filteredTimeZones}
                addClock={addClock}
                inNavbar={true}
              />

              {localClock && (
                <QuickTimeline
                  timeZoneNames={timeZones.map(tz => tz.name)}
                  filteredTimeZones={filteredTimeZones}
                  baseTimeZone={localClock.timeZone}
                  baseTitle={localClock.title}
                  onAddClock={addTimeZoneClock}
                  inNavbar={true}
                />
              )}

              {localClock && (
                <TimeConverter
                  timeZones={filteredTimeZones}
                  baseTimeZone={localClock.timeZone}
                  onAddClock={addTimeZoneClock}
                  inNavbar={true}
                />
              )}
            </Navbar.Collapse>
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
          <div className="flex flex-wrap justify-center mx-5 gap-5">
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

        <Footer />
      </article>

      <Script
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
        strategy="beforeInteractive"
        defer={false}
      />
    </Flowbite>
  )
}
