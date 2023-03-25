import { useState } from 'react';
import { Badge } from 'flowbite-react';
import { tzOffset, gmtStr } from '@/lib/timezones';
import { IClock } from '@/lib/clock';
import EditClock from './edit-clock';
import ShowTimeline from './show-timeline';
import { Card } from './core/card';
import { DropdownMenu, MenuItem } from './core/dropdown-menu';
import TimeDisplay from './time-display';
import DateDisplay from './date-display';
import { useAppContext } from './context/app-context';
import { ActionType } from './context/app-reducer';

interface Props {
  clock: IClock;
  defaultClock: IClock;
}

export function ClockCard(props: Props) {
  const { dispatch } = useAppContext();
  const [showEdit, setShowEdit] = useState(false);

  const clock = props.clock;
  const timeZone = clock.timeZone;

  function deleteClock(clock: IClock) {
    dispatch({
      type: ActionType.Delete,
      payload: { clock }
    });
  }

  const menuItems: MenuItem[] = [
    {
      label: "Edit clock",
      action: () => setShowEdit(true)
    },
    {
      label: "Delete clock",
      action: () => deleteClock(clock),
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
        onClose={() => setShowEdit(false)}
      />
    </>
  )
}
