import Head from 'next/head';
import { Flowbite, Label, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { getTimezones } from '@/lib/timezones';
import { save, load } from '@/lib/storage';
import { Clock, ClockData, tzToClock } from '@/components/clock';
import ModalContainer from '@/components/modal-container';
import Theme from '@/components/flowbite-theme';

export default function Home() {
  const [clocks, setClocks] = useState<ClockData[]>([]);
  const [timezones, setTimezones] = useState<string[]>([]);

  const [modalTimezone, setModalTimezone] = useState<string>("");
  const [modalTitle, setModalTitle] = useState<string>("");

  function addClock() {
    const newClocks = [
      ...clocks,
      tzToClock(modalTimezone, modalTitle)
    ];

    saveAndSetClocks(newClocks);

    setModalTitle("");
  }

  function filterTimezones(timezones: string[], clocks: ClockData[]): string[] {
    return timezones.filter(tz => !clocks.some(clock => clock.timezone === tz));
  }

  function updateModalTimezone(timezones: string[], clocks: ClockData[]) {
    const tz = filterTimezones(timezones, clocks)[0] ?? "";
    setModalTimezone(tz);
  }

  function saveAndSetClocks(clocks: ClockData[]) {
    save("clocks", clocks);

    setClocks(clocks);

    updateModalTimezone(timezones, clocks);
  }

  function loadClocks(): ClockData[] | undefined {
    return load("clocks");
  }

  function validateClocks(clocks: ClockData[]): ClockData[] {
      if (clocks.length) {
        const firstClock = clocks[0];

        if (!firstClock.default) {
          return [];
        }
      }

      return clocks;
  }

  function onClockEdit(clock: ClockData) {
    console.log("edit clock: " + clock.timezone);
  }

  function onClockDelete(clockToDelete: ClockData) {
    const newClocks = clocks.filter(clock => clock !== clockToDelete);

    saveAndSetClocks(newClocks);
  }

  useEffect(
    () => {
      const timezones = getTimezones();

      setTimezones(timezones);

      const storedClocks = validateClocks(
        loadClocks() ?? []
      );

      if (storedClocks.length) {
        setClocks(storedClocks);
        updateModalTimezone(timezones, storedClocks);
      } else {
        const defClocks = [{
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          title: "Local Time",
          default: true
        }];

        saveAndSetClocks(defClocks);
      }
    },
    []
  );

  return (
    <Flowbite theme={Theme()}>
      <Head>
        <title>Timezoned</title>
        <meta name="description" content="Timezone helper" />
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
              onChange={event => setModalTimezone(event.currentTarget.value)}
              required={true}
            >
              {filterTimezones(timezones, clocks).map((timezone) => (
                <option key={timezone} value={timezone}>
                  {timezone}
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
              onChange={event => setModalTitle(event.target.value)}
            />
          </div>
        </ModalContainer>
      </nav>
      <main className="flex flex-wrap justify-center items-start p-5 gap-6 mt-2">
        {clocks.map(clock => (
          <Clock
            data={clock}
            key={clock.timezone}
            onDelete={onClockDelete}
            onEdit={onClockEdit}
          />
        ))}
      </main>
    </Flowbite>
  )
}
