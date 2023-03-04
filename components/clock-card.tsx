import { format } from 'date-fns';
import { Badge } from 'flowbite-react';
import { ReactNode, useEffect, useState } from 'react';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon, LockClosedIcon } from '@heroicons/react/20/solid';
import { gmtOffset, localOffset, tzDate } from '@/lib/timezones';
import { IClock } from '@/lib/clock';

interface MenuItem {
  label: string;
  action: () => void;
  className?: string;
}

interface Props {
  clock: IClock;
  onEdit?: (clock: IClock) => void;
  onDelete?: (clock: IClock) => void;
}

export function ClockCard(props: Props) {
  const [now, setNow] = useState(new Date());

  const clock: IClock = props.clock;

  useEffect(
    () => {
      setInterval(() => {
        setNow(new Date());
      }, 100); // 100ms
    },
    []
  );

  const menuItems: MenuItem[] = [
    {
      label: "Edit clock",
      action: () => props.onEdit?.(clock)
    },
    {
      label: "Delete clock",
      action: () => props.onDelete?.(clock),
      className: "text-red-500"
    }
  ];

  function staticTitle(): ReactNode {
    return (
      <h3 className="inline-flex w-full pl-2">
        <span className="font-bold">
          {clock.title}
        </span>
        <LockClosedIcon
          className="ml-1 w-4 opacity-40"
          aria-hidden="true"
        />
      </h3>
    );
  }

  function menu(): ReactNode {
    return (
      <Menu as="div" className="relative inline-block">
        <Menu.Button>
          <h3 className="inline-flex w-full pl-2">
            <span className="font-bold">
              {clock.title}
            </span>
            <ChevronDownIcon
              className="ml-1 -mb-1 w-5 hover:opacity-50"
              aria-hidden="true"
            />
          </h3>
        </Menu.Button>
        <Menu.Items className="absolute mt-2 divide-y right-0 divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {menuItems.map(item => (
            <Menu.Item key={item.label}>
            {({ active }) => (
              <a
                className={`${active && 'bg-slate-100'} w-full block py-1 px-4 whitespace-nowrap ${item.className ?? ""}`}
                onClick={item.action}
                href="#"
              >
                {item.label}
              </a>
            )}
          </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 shadow-md p-4 bg-white">
      {clock.default ? staticTitle() : menu()}
      <div className="text-indigo-500 text-5xl -mt-1">
        {format(tzDate(clock.timeZone), 'HH:mm')}
      </div>
      <div>{clock.timeZone}</div>
      <div className="flex flex-wrap gap-1">
        <Badge color="indigo">
          {localOffset(now, clock.timeZone)}
        </Badge>
        <Badge color="success">
          GMT{gmtOffset(now, clock.timeZone)}
        </Badge>
      </div>
    </div>
  )
}
