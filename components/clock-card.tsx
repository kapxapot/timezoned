import { useState } from 'react';
import { Badge } from 'flowbite-react';
import { tzOffset, gmtStr, extractCity } from '@/lib/timezones';
import { ClockChange, IClock } from '@/lib/clock';
import EditClock from './modals/edit-clock';
import ShowTimeline from './modals/show-timeline';
import { Card } from './core/card';
import { DropdownMenu, MenuItem } from './core/dropdown-menu';
import TimeDisplay from './bits/time-display';
import DateDisplay from './bits/date-display';
import { useAppContext } from './context/app-context';

interface Props {
  clock: IClock;
  defaultClock: IClock;
}

export function ClockCard(props: Props) {
  const { dispatch } = useAppContext();
  const [showEdit, setShowEdit] = useState(false);

  const clock = props.clock;
  const timeZone = clock.timeZone;
  const offset = tzOffset(timeZone);

  function saveClock(change: ClockChange) {
    setShowEdit(false);

    if (!change.title) {
      change.title = extractCity(change.timeZone);
    }

    dispatch({ type: "Edit", clock, change });
  }

  function deleteClock() {
    dispatch({ type: "Delete", clock });
  }

  function openEdit() {
    setShowEdit(true);
  }

  function closeEdit() {
    setShowEdit(false);
  }

  const menuItems: MenuItem[] = [
    {
      label: "Edit clock",
      action: openEdit
    },
    {
      label: "Delete clock",
      action: deleteClock,
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
            {offset ?? "🏡"}
          </Badge>
          <Badge color="success">
            {gmtStr(timeZone)}
          </Badge>
        </div>
        <div className="mt-2">
          <ShowTimeline
            clock={clock}
            defaultClock={props.defaultClock}
            buttonDisabled={!offset}
          />
        </div>
      </Card>

      <EditClock
        clock={clock}
        show={showEdit}
        onSubmit={saveClock}
        onCancel={closeEdit}
      />
    </>
  )
}
