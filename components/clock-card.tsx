import { useState } from 'react';
import { Badge } from 'flowbite-react';
import { utcOffset, tzOffset } from '@/lib/timezones';
import { ClockChange, IClock } from '@/lib/clock';
import EditClock from './edit-clock';
import ShowTimeline from './show-timeline';
import { Card } from './core/card';
import { DropdownMenu, MenuItem } from './core/dropdown-menu';
import TimeDisplay from './time-display';

interface Props {
  clock: IClock;
  defaultClock: IClock;
  timeZones: string[];
  addedTimeZones: string[];
  onEdit?: (clock: IClock, change: ClockChange) => void;
  onDelete?: (clock: IClock) => void;
}

export function ClockCard(props: Props) {
  const [showEdit, setShowEdit] = useState(false);

  const clock: IClock = props.clock;

  const menuItems: MenuItem[] = [
    {
      label: "Edit clock",
      action: () => setShowEdit(true)
    },
    {
      label: "Delete clock",
      action: () => props.onDelete?.(clock),
      className: "text-red-500"
    }
  ];

  return (
    <>
      <Card className="min-w-[160px]">
        <div className="-mt-0.5">
          <DropdownMenu
            label={clock.title}
            items={menuItems}
          />
        </div>
        <div className="-mt-1">
          <TimeDisplay
            timeZone={clock.timeZone}
          />
        </div>
        <div>{clock.timeZone}</div>
        <div className="flex flex-wrap gap-1">
          <Badge color="indigo">
            {tzOffset(clock.timeZone)}
          </Badge>
          <Badge color="success">
            GMT{utcOffset(clock.timeZone)}
          </Badge>
        </div>
        <div className="mt-2">
          <ShowTimeline
            clock={clock}
            defaultClock={props.defaultClock}
          />
        </div>
      </Card>

      <EditClock
        clock={clock}
        show={showEdit}
        timeZones={props.timeZones}
        addedTimeZones={props.addedTimeZones}
        onClose={() => setShowEdit(false)}
        onEdit={change => props.onEdit?.(clock, change)}
      />
    </>
  )
}
