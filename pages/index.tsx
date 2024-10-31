import { DarkThemeToggle, Flowbite, Navbar, ThemeProps, Tooltip } from "flowbite-react";
import { flowbiteTheme } from "@/components/config/flowbite-theme";
import { ClockCard } from "@/components/clock-card";
import AddClock from "@/components/modals/add-clock";
import { DefaultClockCard } from "@/components/default-clock-card";
import QuickTimeline from "@/components/modals/quick-timeline";
import TimeConverter from "@/components/modals/time-converter";
import Footer from "@/components/footer";
import PageHead from "@/components/page-head";
import Tour from "@/components/tour";
import { useAppContext } from "@/components/context/app-context";
import { useEffect, useState } from "react";
import { HiOutlineViewGrid, HiOutlineViewList } from "react-icons/hi";
import TimelineCard from "@/components/timeline-card";

export default function Home() {
  const host = "https://timezoned.vercel.app";

  const { defaultClock, customClocks } = useAppContext();
  const [dark, setDark] = useState(false);
  const [timelineMode, setTimelineMode] = useState(false);

  const hasCustomClocks = customClocks.length > 0;

  useEffect(() => {
    const appTheme = localStorage.getItem("theme");

    if (appTheme) {
      setDark(appTheme === "dark");
      return;
    }

    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (systemDark) {
      setDark(true);
    }
  }, []);

  function onThemeToggle() {
    localStorage.setItem("theme", dark ? "light" : "dark");
    setDark(!dark);
  }

  const theme: ThemeProps = {
    ...flowbiteTheme,
    dark
  };

  return (
    <Flowbite theme={theme}>
      <PageHead
        host={host}
      />

      <article className="flex flex-col min-h-dvh gap-5">
        <Navbar
          fluid={true}
          className="shadow"
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
            className="navbar-toggle-element"
          />

          <Navbar.Collapse
            className="items-center navbar-collapse-element md:mr-1"
          >
            <AddClock
              inNavbar={true}
              buttonClassName="tour-step-add-clock"
            />

            {defaultClock &&
              <QuickTimeline
                defaultClock={defaultClock}
                inNavbar={true}
                buttonClassName="tour-step-timeline"
              />
            }

            {defaultClock &&
              <TimeConverter
                baseTimeZone={defaultClock.timeZone}
                inNavbar={true}
                buttonClassName="tour-step-converter"
              />
            }
          </Navbar.Collapse>
        </Navbar>

        <main className="grow mx-5">
          {defaultClock &&
            <div className="flex items-center justify-center gap-3 mb-5">
              <Tooltip
                content={timelineMode ? "Toggle card mode" : "Toggle timeline mode"}
              >
                <button
                  className="tour-step-timeline-view flex-shrink-0 rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700 cursor-pointer disabled:cursor-not-allowed"
                  onClick={() => setTimelineMode(!timelineMode)}
                  disabled={!hasCustomClocks}
                >
                  {timelineMode ? <HiOutlineViewGrid className="size-5" /> : <HiOutlineViewList className="size-5" />}
                </button>
              </Tooltip>

              <DefaultClockCard
                clock={defaultClock}
                className="tour-step-clock"
              />

              <Tooltip content={dark ? "Toggle light mode" : "Toggle dark mode"}>
                <DarkThemeToggle
                  className="tour-step-dark-theme"
                  onClick={() => onThemeToggle()}
                />
              </Tooltip>
            </div>
          }

          {defaultClock && (
            <>
              {timelineMode && hasCustomClocks && (
                <TimelineCard
                  defaultClock={defaultClock}
                  customClocks={customClocks}
                />
              )}
              {!timelineMode && (
                <div className="flex flex-wrap justify-center gap-5">
                  {customClocks.map(clock => (
                    <ClockCard
                      key={clock.id}
                      clock={clock}
                      defaultClock={defaultClock}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </main>

        <Footer />
      </article>

      <Tour />
    </Flowbite>
  )
}
