import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Badge } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { gmtOffset, localOffset, tzDate } from '@/lib/timezones';

export interface ClockData {
  timezone: string;
  title?: string;
  default?: boolean;
}

interface MenuItemData {
  label: string;
  action: () => void;
  className?: string;
}

interface Props {
  data: ClockData;
  onEdit?: (clock: ClockData) => void;
  onDelete?: (clock: ClockData) => void;
}

export function tzToClock(timezone: string, title?: string): ClockData {
  return {
    timezone: timezone,
    title: title ? title : timezone
  };
}

export function Clock(props: Props) {
  const [now, setNow] = useState(new Date());

  useEffect(
    () => {
      setInterval(() => {
        // Update the current time every 100ms.
        setNow(new Date());
      }, 100);
    },
    []
  );

  function getMenuItems(): MenuItemData[] {
    const menuItems = [];

    menuItems.push({
      label: "Edit clock",
      action: () => props.onEdit?.(props.data),
      className: ""
    });

    if (!props.data.default) {
      menuItems.push({
        label: "Delete clock",
        action: () => props.onDelete?.(props.data),
        className: "text-red-500"
      });
    }

    return menuItems;
  }

  const timezone: string = props.data.timezone;

  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 shadow-md bg-slate-50 p-4">
      <Menu as="div" className="relative inline-block">
        <Menu.Button>
          <h3 className="inline-flex w-full pl-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <span className="font-bold">
              {props.data.title ?? timezone}
            </span>
            <ChevronDownIcon
              className="ml-1 -mb-1 w-5 hover:opacity-50"
              aria-hidden="true"
            />
          </h3>
        </Menu.Button>
        <Menu.Items className="absolute mt-2 divide-y right-0 divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {getMenuItems().map(item => (
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
      <div className="text-indigo-500 text-5xl -mt-1">
        {format(tzDate(timezone), 'HH:mm')}
      </div>
      <div>{timezone}</div>
      <div className="flex flex-wrap gap-1">
        <Badge color="indigo">
          {localOffset(now, timezone)}
        </Badge>
        <Badge color="success">
          GMT{gmtOffset(now, timezone)}
        </Badge>
      </div>
    </div>
  )
}
