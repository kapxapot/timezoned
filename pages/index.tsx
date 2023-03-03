import Head from 'next/head';
import { Flowbite } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { TimeZone } from "@vvo/tzdb";
import { save, load } from '@/lib/storage';
import { sortedTimeZones } from '@/lib/timezones';
import { Clock, ClockData, tzToClock } from '@/components/clock';
import ModalContainer from '@/components/modal-container';
import { flowbiteTheme } from '@/components/flowbite-theme';
import ClockForm from '@/components/clock-form';

export default function Home() {
  const [clocks, setClocks] = useState<ClockData[]>([]);
  const [timeZones, setTimeZones] = useState<TimeZone[]>([]);

  const [modalTimeZone, setModalTimeZone] = useState<string>("");
  const [modalTitle, setModalTitle] = useState<string>("");

  const localTime: string = "Local Time";
  const filteredTimeZones: TimeZone[] = filterTimeZones(timeZones, clocks);

  function filterClocks(clocks: ClockData[]): ClockData[] {
    return clocks.filter(clock => !clock.default);
  }

  function filterTimeZones(timeZones: TimeZone[], clocks: ClockData[]): TimeZone[] {
    return timeZones.filter(
      tz => !clocks.some(clock => clock.timeZone === tz.name)
    );
  }

  function addClock() {
    saveAndSetClocks([
      ...clocks,
      tzToClock(modalTimeZone, modalTitle)
    ]);

    setModalTitle("");
  }

  function updateModalTimeZone(timeZones: TimeZone[], clocks: ClockData[]) {
    setModalTimeZone(
      filterTimeZones(timeZones, clocks)[0]?.name
    );
  }

  function saveAndSetClocks(clocks: ClockData[]) {
    save("clocks", filterClocks(clocks));

    setClocks(clocks);

    updateModalTimeZone(timeZones, clocks);
  }

  function onClockEdit(clock: ClockData) {
    console.log("edit clock: " + clock.timeZone);
  }

  function onClockDelete(clockToDelete: ClockData) {
    saveAndSetClocks(
      clocks.filter(clock => clock !== clockToDelete)
    );
  }

  useEffect(
    () => {
      const timeZones = sortedTimeZones;

      setTimeZones(timeZones);

      const storedClocks = filterClocks(
        load("clocks") ?? []
      );

      const localClock: ClockData = {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        title: localTime,
        default: true
      };

      const clocks = [localClock, ...storedClocks];

      setClocks(clocks);
      updateModalTimeZone(timeZones, clocks);
    },
    []
  );

  return (
    <Flowbite theme={flowbiteTheme}>
      <Head>
        <title>TimeZoned</title>
        <meta name="description" content="Time zone helper" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="flex space-x-2 justify-center mt-5">
        <ModalContainer
          buttonLabel="Add clock"
          buttonDisabled={!filteredTimeZones.length}
          submitLabel="Add"
          onSubmit={addClock}
        >
          <ClockForm
            timeZones={filteredTimeZones}
            onTimeZoneChange={timeZone => setModalTimeZone(timeZone)}
            onTitleChange={title => setModalTitle(title)}
          />
        </ModalContainer>
      </nav>
      <main className="flex flex-wrap justify-center items-start p-5 gap-6 mt-2">
        {clocks.map(clock => (
          <Clock
            data={clock}
            key={clock.timeZone}
            onDelete={onClockDelete}
            onEdit={onClockEdit}
          />
        ))}
      </main>
    </Flowbite>
  )
}
