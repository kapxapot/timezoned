import { useEffect, useState } from "react";
import Head from "next/head";
import Script from "next/script";
import dynamic from "next/dynamic";
import { Flowbite, Navbar } from "flowbite-react";
import { merge } from "@/lib/common";
import { Clock, ClockChange, IClock } from "@/lib/clock";
import { save, load } from "@/lib/storage";
import { sortedTimeZones } from "@/lib/timezones";
import { flowbiteTheme } from "@/components/config/flowbite-theme";
import { ClockCard } from "@/components/clock-card";
import AddClock from "@/components/add-clock";
import { DefaultClockCard } from "@/components/default-clock-card";
import QuickTimeline from "@/components/quick-timeline";
import TimeConverter from "@/components/time-converter";
import Footer from "@/components/footer";
import { STATUS } from "react-joyride";

export default function Home() {
  const [clocks, setClocks] = useState<IClock[]>([]);
  const [showTour, setShowTour] = useState(true);

  // all timezones
  const timeZones = sortedTimeZones;

  // timezones of the clocks on the dashboard
  const dashboardTimeZones = timeZones.filter(
    tz => clocks.some(c => c.timeZone === tz.name)
  );

  const timeZoneNames = timeZones.map(tz => tz.name);
  const dashboardTimeZoneNames = dashboardTimeZones.map(tz => tz.name);

  const defaultClockLabel = "My time";

  // aka local clock
  const defaultClock = clocks.find(c => c.default);

  // all other clocks on the dashboard other than default
  const customClocks = filterCustomClocks(clocks);

  function filterCustomClocks(clocks: IClock[]): IClock[] {
    return clocks.filter(c => c !== defaultClock);
  }

  function addClockByTimeZone(timeZone: string) {
    addClock(
      new Clock(timeZone)
    );
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
      clocks.filter(c => c !== deletedClock)
    );
  }

  function updateClocks(clocks: IClock[]) {
    save("clocks", filterCustomClocks(clocks));

    setClocks(clocks);
  }

  function loadClocks(): IClock[] {
    const clocks = load<any[]>("clocks") ?? [];

    return clocks.map(obj => Clock.deserialize(obj));
  }

  useEffect(() => {
    const defaultClock = new Clock(
      Intl.DateTimeFormat().resolvedOptions().timeZone,
      defaultClockLabel,
      true
    );

    setClocks([defaultClock, ...loadClocks()]);

    setShowTour(!load("tourDone", false));
  }, []);

  const JoyrideClientSide = dynamic(
    () => import('react-joyride'),
    { ssr: false }
  );

  return (
    <Flowbite theme={flowbiteTheme}>
      <Head>
        <title>Timezoned</title>
        <meta name="description" content="Timezone helper" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/tz.svg" />
      </Head>

      <article className="flex flex-col min-h-screen gap-5">
        <Navbar
          fluid={true}
        >
          <Navbar.Brand>
            <picture>
              <img
                src="/tz.svg"
                className="mr-3 h-6 sm:h-9"
                alt="Timezoned Logo"
              />
            </picture>
            <span className="tour-step-1 self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Timezoned
            </span>
          </Navbar.Brand>

          <Navbar.Toggle />
          <Navbar.Collapse
            className="items-center"
          >
            <AddClock
              timeZones={timeZoneNames}
              addedTimeZones={dashboardTimeZoneNames}
              inNavbar={true}
              buttonClassName="tour-step-3"
              addClock={addClock}
            />

            {defaultClock && (
              <QuickTimeline
                timeZones={timeZoneNames}
                addedTimeZones={dashboardTimeZoneNames}
                baseTimeZone={defaultClock.timeZone}
                baseTitle={defaultClock.title}
                inNavbar={true}
                buttonClassName="tour-step-4"
                onAddClock={addClockByTimeZone}
              />
            )}

            {defaultClock && (
              <TimeConverter
                addedTimeZones={dashboardTimeZoneNames}
                baseTimeZone={defaultClock.timeZone}
                inNavbar={true}
                buttonClassName="tour-step-5"
                onAddClock={addClockByTimeZone}
              />
            )}
          </Navbar.Collapse>
        </Navbar>

        <main className="grow">
          {defaultClock && (
            <div className="flex justify-center mb-5">
              <DefaultClockCard
                clock={defaultClock}
                className="tour-step-2"
              />
            </div>
          )}
          {defaultClock && (
            <div className="flex flex-wrap justify-center mx-5 gap-5">
              {customClocks.map(clock => (
                <ClockCard
                  clock={clock}
                  defaultClock={defaultClock}
                  key={clock.id}
                  timeZones={timeZoneNames}
                  addedTimeZones={dashboardTimeZoneNames}
                  onDelete={deleteClock}
                  onEdit={editClock}
                />
              ))}
            </div>
          )}
        </main>

        <Footer />
      </article>

      {showTour && (
        <JoyrideClientSide
          steps={[
            {
              target: ".tour-step-1",
              content: "Welcome to Timezoned, a simple page that allows you to track your current timezone and compare it to other timezones.",
              disableBeacon: true,
            },
            {
              target: ".tour-step-2",
              content: "This is your local time and timezone. It is detected automatically.",
              disableBeacon: true,
            },
            {
              target: ".tour-step-3",
              content: "Add clocks for other timezones to track their time.",
              disableBeacon: true,
            },
            {
              target: ".tour-step-4",
              content: "Compare timelines of other timezones with your local timezone.",
              disableBeacon: true,
            },
            {
              target: ".tour-step-5",
              content: "Parse times with a timezone abbreviation like UTC and convert them to your local timezone.",
              disableBeacon: true,
            },
          ]}
          callback={({ status }) => {
            if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
              save("tourDone", true);
            }
          }}
          continuous={true}
          showProgress={true}
          showSkipButton={true}
          styles={{
            tooltipContainer: {
              textAlign: "left"
            },
            buttonNext: {
              backgroundColor: "#0e9f6e"
            },
            buttonBack: {
              color: "black",
              marginRight: 10
            }
          }}
          locale={{
            last: "End tour"
          }}
        />
      )}

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
