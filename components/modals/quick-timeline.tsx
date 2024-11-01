import { useState } from 'react';
import { Label } from 'flowbite-react';
import TimeZoneAutocomplete from '../timezone-autocomplete';
import ClockAlreadyAdded from '../bits/clock-already-added';
import { extractCity } from '@/lib/timezones';
import { CalendarDaysIcon } from '@heroicons/react/20/solid';
import { useAppContext } from '../context/app-context';
import { IClock } from '@/lib/clock';
import ModalButton from '../core/modal-button';
import PopupModal from '../core/popup-modal';
import TimelineWrapper from '../timeline-wrapper';

interface Props {
  defaultClock: IClock;
  inNavbar?: boolean;
  buttonClassName?: string;
}

export default function QuickTimeline({ defaultClock, inNavbar, buttonClassName }: Props) {
  const { timeZones, activeTimeZones, dispatch } = useAppContext();
  const [timeZone, setTimeZone] = useState(timeZones[0]);
  const [showModal, setShowModal] = useState(false);

  const alreadyAdded = activeTimeZones.some(tz => tz === timeZone);

  function addClock() {
    closeModal();
    dispatch({ type: "AddTimeZone", timeZone });
  }

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <>
      <ModalButton
        buttonLabel="Timeline"
        buttonIcon={<CalendarDaysIcon className="w-5" />}
        buttonClassName={buttonClassName}
        inNavbar={inNavbar}
        onClick={openModal}
      />

      <PopupModal
        show={showModal}
        title="Quick timeline"
        flexWidth={true}
        submitLabel="Add clock"
        submitDisabled={alreadyAdded}
        onSubmit={addClock}
        onCancel={closeModal}
      >
        <div className="mb-5">
          <div className="mb-2 block">
            <Label htmlFor="timeZone" value="Timezone" />
          </div>
          <TimeZoneAutocomplete
            id="timeZone"
            defaultValue={timeZone}
            onChange={setTimeZone}
          />
        </div>

        <TimelineWrapper
          defaultClock={defaultClock}
          timeZones={[timeZone]}
          titles={[`${extractCity(timeZone)} time`]}
        />

        {alreadyAdded && <ClockAlreadyAdded />}
      </PopupModal>
    </>
  )
}
