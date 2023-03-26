import { FormEvent } from 'react';
import { Button, Label, TextInput } from 'flowbite-react';
import TimeZoneAutocomplete from './timezone-autocomplete';
import { ClockChange, IClock } from '@/lib/clock';
import { cast } from '@/lib/common';
import ClockAlreadyAdded from './bits/clock-already-added';
import { useAppContext } from './context/app-context';

interface Props {
  clock?: IClock;
  timeZone: string;
  submitLabel: string;
  onTimeZoneChange?: (timeZone: string) => void;
  onSubmit: (change: ClockChange) => void;
  onCancel: () => void;
}

export default function ClockForm(props: Props) {
  const { activeTimeZones } = useAppContext();

  const alreadyAdded = (!props.clock || props.timeZone !== props.clock.timeZone)
    && activeTimeZones.some(tz => tz === props.timeZone);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    props.onSubmit(
      cast<ClockChange>(formJson)
    );
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={onSubmit}
    >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="timeZone" value="Timezone" />
        </div>
        <TimeZoneAutocomplete
          id="timeZone"
          defaultValue={props.timeZone}
          onChange={(tz) => props.onTimeZoneChange?.(tz)}
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="clockTitle" value="Title" />
        </div>
        <TextInput
          id="clockTitle"
          name="title"
          maxLength={20}
          defaultValue={props.clock ? props.clock.title : ""}
        />
      </div>

      {alreadyAdded && <ClockAlreadyAdded />}

      <div className="flex justify-end gap-3 mt-6 w-full">
        <Button
          color="purple"
          disabled={alreadyAdded}
          type="submit"
        >
          {props.submitLabel}
        </Button>

        <Button
          color="gray"
          onClick={props.onCancel}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
