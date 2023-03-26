import { Flowbite, Navbar } from "flowbite-react";
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

export default function Home() {
  const host = "https://timezoned.vercel.app";

  const { defaultClock, customClocks } = useAppContext();

  return (
    <Flowbite theme={flowbiteTheme}>
      <PageHead
        host={host}
      />

      <article className="flex flex-col min-h-screen gap-5">
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

        <main className="grow">
          {defaultClock && 
            <div className="flex justify-center mb-5">
              <DefaultClockCard
                clock={defaultClock}
                className="tour-step-clock"
              />
            </div>
          }

          {defaultClock && (
            <div className="flex flex-wrap justify-center mx-5 gap-5">
              {customClocks.map(clock => (
                <ClockCard
                  key={clock.id}
                  clock={clock}
                  defaultClock={defaultClock}
                />
              ))}
            </div>
          )}
        </main>

        <Footer
          host={host}
        />
      </article>

      <Tour />
    </Flowbite>
  )
}
