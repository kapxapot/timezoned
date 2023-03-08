import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { getTimeZone, tzStr } from '@/lib/timezones';
import { TimeZone } from '@vvo/tzdb';

interface Props {
  id: string;
  timeZoneNames: string[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export default function TimeZoneAutocomplete(props: Props) {
  const [query, setQuery] = useState("");

  function matches(query: string, value?: string): boolean {
    if (!value) {
      return false;
    }

    return value
      .toLowerCase()
      .replace(/(\s|_|\/)+/g, "")
      .includes(query.toLowerCase().replace(/\s+/g, ""));
  }

  function timeZoneMatches(query: string, timeZone?: TimeZone): boolean {
    if (!timeZone) {
      return false;
    }

    return matches(query, timeZone.abbreviation)
      || timeZone.mainCities.some(city => matches(query, city));
  }

  const filteredTimeZones = !query
    ? props.timeZoneNames
    : props.timeZoneNames.filter(timeZone =>
        matches(query, timeZone) ||
        timeZoneMatches(query, getTimeZone(timeZone))
      );

  function displayStr(timeZone: string): string {
    const tzObj = getTimeZone(timeZone);

    return tzObj ? tzStr(tzObj) : timeZone;
  }

  function handleFocus(event: any) {
    event.target.select();
  }

  return (
    <div>
      <Combobox
        defaultValue={props.defaultValue ?? props.timeZoneNames[0]}
        onChange={value => props.onChange?.(value)}
      >
        <div className="relative mt-1">
          <div>
            <Combobox.Input
              className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 rounded-lg p-2.5 text-sm"
              id={props.id}
              name={props.id}
              onChange={event => setQuery(event.target.value)}
              onFocus={handleFocus}
              autoComplete="off"
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-36 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
              {!filteredTimeZones.length && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredTimeZones.map(timeZone => (
                  <Combobox.Option
                    key={timeZone}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-slate-100" : "text-gray-900"
                      }`
                    }
                    value={timeZone}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {displayStr(timeZone)}
                        </span>
                        {selected ? (
                          <span
                            className="absolute inset-y-0 left-0 flex items-center pl-3"
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}
