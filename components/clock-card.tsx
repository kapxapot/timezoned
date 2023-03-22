import { useState } from 'react';
import { Badge } from 'flowbite-react';
import { tzOffset, gmtStr } from '@/lib/timezones';
import { ClockChange, IClock } from '@/lib/clock';
import EditClock from './edit-clock';
import ShowTimeline from './show-timeline';
import { Card } from './core/card';
import { DropdownMenu, MenuItem } from './core/dropdown-menu';
import TimeDisplay from './time-display';
import DateDisplay from './date-display';

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

  const clock = props.clock;
  const timeZone = clock.timeZone;

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
            timeZone={timeZone}
          />
        </div>
        <div className="mb-1">
          <DateDisplay
            timeZone={timeZone}
          />
        </div>
        <div>
          <Badge color="gray">
            {timeZone}
          </Badge>
        </div>
        <div className="flex flex-wrap gap-1">
          <Badge color="indigo">
            {tzOffset(timeZone)}
          </Badge>
          <Badge color="success">
            {gmtStr(timeZone)}
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
