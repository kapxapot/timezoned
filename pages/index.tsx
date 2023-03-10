import { useEffect, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { Collapse } from "flowbite";
import { Button, Flowbite, Navbar } from "flowbite-react";
import { STATUS } from "react-joyride";
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

  // navbar collapse
  const [collapse, setCollapse] = useState<Collapse | undefined>();
  const [collapseExpanded, setCollapseExpanded] = useState(false);

  useEffect(() => {
    const targetEl: HTMLElement | null = document.querySelector('.navbar-collapse-element');
    const triggerEl: HTMLElement | null = document.querySelector('.navbar-toggle-element');

    setCollapse(
      new Collapse(targetEl, triggerEl)
    );
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
            <span className="tour-step-intro self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Timezoned
            </span>
          </Navbar.Brand>

          <Navbar.Toggle
            onClick={() => setCollapseExpanded(!collapseExpanded)}
            className="navbar-toggle-element"
          />
          <Navbar.Collapse
            className="items-center navbar-collapse-element md:mr-1"
          >
            <AddClock
              timeZones={timeZoneNames}
              addedTimeZones={dashboardTimeZoneNames}
              inNavbar={true}
              buttonClassName="tour-step-add-clock"
              addClock={addClock}
            />

            {defaultClock && (
              <QuickTimeline
                timeZones={timeZoneNames}
                addedTimeZones={dashboardTimeZoneNames}
                baseTimeZone={defaultClock.timeZone}
                baseTitle={defaultClock.title}
                inNavbar={true}
                buttonClassName="tour-step-timeline"
                onAddClock={addClockByTimeZone}
              />
            )}

            {defaultClock && (
              <TimeConverter
                addedTimeZones={dashboardTimeZoneNames}
                baseTimeZone={defaultClock.timeZone}
                inNavbar={true}
                buttonClassName="tour-step-converter"
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
                className="tour-step-clock"
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
              target: ".tour-step-intro",
              content: "Welcome to Timezoned, a simple page that allows you to track your current timezone and compare it to other timezones.",
              disableBeacon: true,
            },
            {
              target: ".tour-step-clock",
              content: "This is your local time and timezone. It is detected automatically.",
              disableBeacon: true,
            },
            {
              target: ".tour-step-add-clock",
              content: "Add clocks for other timezones to track their time.",
              disableBeacon: true,
            },
            {
              target: ".tour-step-timeline",
              content: "Compare timelines of other timezones to your local timezone.",
              disableBeacon: true,
            },
            {
              target: ".tour-step-converter",
              content: "Parse times with a timezone abbreviation like UTC and convert them to your local timezone.",
              disableBeacon: true,
            },
          ]}
          callback={data => {
            const { status, step, type } = data;

            if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
              save("tourDone", true);
              setShowTour(false);

              // try to collapse collapse
              collapse?.collapse();
            } else if (type === "step:after" && step.target === ".tour-step-clock") {
              // try to expand collapse
              collapse?.expand();
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
    </Flowbite>
  )
}
