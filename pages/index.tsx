import Head from 'next/head';
import { Flowbite, Label, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { getTimeZones, TimeZone } from "@vvo/tzdb";
import { save, load } from '@/lib/storage';
import { Clock, ClockData, tzToClock } from '@/components/clock';
import ModalContainer from '@/components/modal-container';
import { flowbiteTheme } from '@/components/flowbite-theme';
import { tzStr } from '@/lib/timezones';

export default function Home() {
  const [clocks, setClocks] = useState<ClockData[]>([]);
  const [timeZones, setTimeZones] = useState<TimeZone[]>([]);

  const [modalTimeZone, setModalTimeZone] = useState<string>("");
  const [modalTitle, setModalTitle] = useState<string>("");

  const localTime: string = "Local Time";

  function addClock() {
    const newClocks = [
      ...clocks,
      tzToClock(modalTimeZone, modalTitle)
    ];

    saveAndSetClocks(newClocks);

    setModalTitle("");
  }

  function filterTimeZones(timeZones: TimeZone[], clocks: ClockData[]): TimeZone[] {
    return timeZones.filter(
      tz => !clocks.some(clock => clock.timeZone === tz.name)
    );
  }

  function updateModalTimeZone(timeZones: TimeZone[], clocks: ClockData[]) {
    const tz = filterTimeZones(timeZones, clocks)[0];
    setModalTimeZone(tz?.name);
  }

  function saveAndSetClocks(clocks: ClockData[]) {
    save("clocks", noDefaultClocks(clocks));

    setClocks(clocks);

    updateModalTimeZone(timeZones, clocks);
  }

  function loadClocks(): ClockData[] | undefined {
    return load("clocks");
  }

  function noDefaultClocks(clocks: ClockData[]): ClockData[] {
    return clocks.filter(clock => !clock.default);
  }

  function onClockEdit(clock: ClockData) {
    console.log("edit clock: " + clock.timeZone);
  }

  function onClockDelete(clockToDelete: ClockData) {
    const newClocks = clocks.filter(clock => clock !== clockToDelete);

    saveAndSetClocks(newClocks);
  }

  useEffect(
    () => {
      const timeZones = getTimeZones({ includeUtc: true }).sort(
        (tzA, tzB) => tzA.name.localeCompare(tzB.name)
      );

      setTimeZones(timeZones);

      const storedClocks = noDefaultClocks(
        loadClocks() ?? []
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
          submitLabel="Add"
          onSubmit={addClock}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="timezones" value="Timezone" />
            </div>
            <Select
              id="timezones"
              onChange={event => setModalTimeZone(event.currentTarget.value)}
              required={true}
            >
              {filterTimeZones(timeZones, clocks).map((timeZone) => (
                <option key={timeZone.name} value={timeZone.name}>
                  {tzStr(timeZone)}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="title" value="Title" />
            </div>
            <TextInput
              id="title"
              maxLength={15}
              onChange={event => setModalTitle(event.target.value)}
            />
          </div>
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
