import { load, save } from "@/lib/storage";
import { Collapse } from "flowbite";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { STATUS } from "react-joyride";

export default function Tour() {
  const [showTour, setShowTour] = useState(true);

  // navbar collapse
  const [collapse, setCollapse] = useState<Collapse | undefined>();

  const JoyrideClientSide = dynamic(
    () => import('react-joyride'),
    { ssr: false }
  );

  useEffect(() => {
    setShowTour(!load<boolean>("tourDone", false));

    const targetEl: HTMLElement | null = document.querySelector('.navbar-collapse-element');
    const triggerEl: HTMLElement | null = document.querySelector('.navbar-toggle-element');

    setCollapse(
      new Collapse(targetEl, triggerEl)
    );
  }, []);

  return (
    <>
      {showTour &&
        <JoyrideClientSide
          steps={[
            {
              target: ".tour-step-intro",
              content: "Welcome to Timezoned, a simple page that allows you to track your current timezone and compare it to other timezones.",
              disableBeacon: true,
            },
            {
              target: ".tour-step-clock",
              content: "This is your local time. It is detected automatically.",
              disableBeacon: true,
            },
            {
              target: ".tour-step-add-clock",
              content: "You can add clocks for other timezones to track their time and compare their timelines with your local one.",
              disableBeacon: true,
            },
            {
              target: ".tour-step-timeline",
              content: "Compare timelines of other timezones to your local timezone without adding them to the dashboard.",
              disableBeacon: true,
            },
            {
              target: ".tour-step-converter",
              content: "Parse times with a timezone abbreviation like UTC and convert them to your local time.",
              disableBeacon: true,
            },
            {
              target: ".tour-step-timeline-view",
              content: "Switch between list and timeline views.",
              disableBeacon: true,
            },
            {
              target: ".tour-step-dark-theme",
              content: "Switch between light and dark themes.",
              disableBeacon: true,
            },
          ]}
          callback={data => {
            const { status, step, type } = data;

            if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
              save("tourDone", true);
              setShowTour(false);

              // try to collapse collapse
              // this is needed only for mobile
              collapse?.collapse();
            } else if (type === "step:after" && step.target === ".tour-step-clock") {
              // try to expand collapse
              // this is needed only for mobile
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
      }
    </>
  )
}
