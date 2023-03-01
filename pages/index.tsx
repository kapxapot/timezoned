import Head from 'next/head';
import { Clock, ClockData } from '@/components/clock';
import ModalContainer from '@/components/modal-container';
import { DeepPartial, FlowbiteTextInputTheme, Label, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { getTimezones } from '@/lib/timezones';

export default function Home() {
  const [clocks, setClocks] = useState<ClockData[]>([]);
  const [timezones, setTimezones] = useState<string[]>([]);

  const [modalTimezone, setModalTimezone] = useState<string>("");
  const [modalTitle, setModalTitle] = useState<string>("");

  function onTimezoneChanged(event: React.ChangeEvent<HTMLSelectElement>) {
    setModalTimezone(event.currentTarget.value);
  }

  function onTitleChanged(event: React.ChangeEvent<HTMLInputElement>) {
    setModalTitle(event.target.value);
  }

  function tzToClock(timezone: string, title?: string): ClockData {
    return {
      timezone: timezone,
      title: title ? title : timezone
    };
  };

  function addClock() {
    const newClocks = [
      ...clocks,
      tzToClock(modalTimezone, modalTitle)
    ];

    saveAndSetClocks(newClocks);
  }

  function filterTimezones(timezones: string[], clocks: ClockData[]): string[] {
    return timezones.filter(tz => !clocks.some(clock => clock.timezone === tz));
  }

  function updateModalTimezone(timezones: string[], clocks: ClockData[]) {
    const tz = filterTimezones(timezones, clocks)[0] ?? "";
    setModalTimezone(tz);
  }

  function saveAndSetClocks(clocks: ClockData[]) {
    localStorage.setItem("clocks", JSON.stringify(clocks));

    setClocks(clocks);

    updateModalTimezone(timezones, clocks);
  }

  function loadClocks(): ClockData[] {
    const rawClocks = localStorage.getItem("clocks");

    return rawClocks ? JSON.parse(rawClocks) : [];
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
        loadClocks()
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

  const textInputTheme: DeepPartial<FlowbiteTextInputTheme> = {
    field: {
      input: {
        base: 'focus:outline-blue-500 block w-full border disabled:cursor-not-allowed disabled:opacity-50'
      }
    }
  };

  return (
    <>
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
              onChange={onTimezoneChanged}
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
              onChange={onTitleChanged}
              theme={textInputTheme}
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
    </>
  )
}
