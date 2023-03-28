import { ChangeEvent, Fragment, useMemo, useState } from 'react'
import debounce from 'lodash.debounce';
import { timeZoneMatches } from '@/lib/timezones';
import { Combobox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useAppContext } from './context/app-context';
import TimeZoneItem from './bits/timezone-item';

interface Props {
  id: string;
  defaultValue: string;
  onChange?: (value: string) => void;
}

export default function TimeZoneAutocomplete(props: Props) {
  const maxResults = 100;
  const debounceTimeout = 200;

  const { timeZones } = useAppContext();
  const [query, setQuery] = useState("");

  const filteredTimeZones = query
    ? timeZones.filter(tz => timeZoneMatches(query, tz))
    : timeZones;

  function handleFocus(event: any) {
    event.target.select();
  }

  const queryChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const debouncedQueryChangeHandler = useMemo(
    () => debounce(queryChangeHandler, debounceTimeout),
    []
  );

  return (
    <div>
      <Combobox
        defaultValue={props.defaultValue}
        onChange={value => props.onChange?.(value)}
      >
        <div className="relative mt-1">
          <div>
            <Combobox.Input
              className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 rounded-lg p-2.5 text-sm"
              id={props.id}
              name={props.id}
              onChange={debouncedQueryChangeHandler}
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
            <Combobox.Options className="absolute mt-1 max-h-52 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-20">
              {!filteredTimeZones.length && query !== "" ? (
                <div className="relative select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                <>
                  {filteredTimeZones.slice(0, maxResults).map(timeZone => (
                    <Combobox.Option
                      key={timeZone}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                          active ? "bg-slate-100" : "text-gray-900"
                        }`
                      }
                      value={timeZone}
                    >
                      {({ selected }) =>
                        <TimeZoneItem
                          selected={selected}
                          timeZoneName={timeZone}
                        />
                      }
                    </Combobox.Option>
                  ))}
                  {(filteredTimeZones.length > maxResults) &&
                    <div className="relative select-none py-2 px-4 text-gray-400">
                      Showing {maxResults} items out of {filteredTimeZones.length}. Please, narrow your search.
                    </div>
                  }
                </>
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}
