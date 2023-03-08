import { format } from 'date-fns';
import { Badge } from 'flowbite-react';
import { ReactNode, useEffect, useState } from 'react';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon, LockClosedIcon } from '@heroicons/react/20/solid';
import { utcOffset, localOffset, tzNow } from '@/lib/timezones';
import { ClockChange, IClock } from '@/lib/clock';
import { TimeZone } from '@vvo/tzdb';
import EditClock from './edit-clock';
import TimelineContainer from './timeline-container';
import { Card } from './core/card';

interface MenuItem {
  label: string;
  action: () => void;
  className?: string;
}

interface Props {
  clock: IClock;
  defaultClock?: IClock;
  timeZones: TimeZone[];
  onEdit?: (clock: IClock, change: ClockChange) => void;
  onDelete?: (clock: IClock) => void;
}

export function ClockCard(props: Props) {
  const [now, setNow] = useState(new Date());
  const [showEdit, setShowEdit] = useState(false);

  const clock: IClock = props.clock;

  useEffect(() => {
    setInterval(() => {
      setNow(new Date());
    }, 100);
  }, []);

  const menuItems: MenuItem[] = [
    {
      label: "Edit",
      action: () => setShowEdit(true)
    },
    {
      label: "Delete",
      action: () => props.onDelete?.(clock),
      className: "text-red-500"
    }
  ];

  function staticTitle(): ReactNode {
    return (
      <h3 className="inline-flex pl-3">
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
          <h3 className="inline-flex pl-3">
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
    <>
      <Card className="min-w-[170px]">
        {clock.default ? staticTitle() : menu()}
        <div className="text-indigo-500 text-5xl -mt-1">
          {format(tzNow(clock.timeZone), 'HH:mm')}
        </div>
        <div>{clock.timeZone}</div>
        <div className="flex flex-wrap gap-1">
          <Badge color="indigo">
            {localOffset(clock.timeZone)}
          </Badge>
          <Badge color="success">
            GMT{utcOffset(clock.timeZone)}
          </Badge>
        </div>
        {(props.defaultClock && clock !== props.defaultClock) && (
          <div className="mt-2">
            <TimelineContainer
              clock={clock}
              defaultClock={props.defaultClock}
            />
          </div>
        )}
      </Card>

      <EditClock
        clock={clock}
        show={showEdit}
        timeZones={props.timeZones}
        onEdit={change => props.onEdit?.(clock, change)}
        onClose={() => setShowEdit(false)}
      />
    </>
  )
}
