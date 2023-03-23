import { CheckCircleIcon } from "@heroicons/react/20/solid";

export default function ClockAlreadyAdded() {
  return (
    <div className="mt-3 flex gap-1 items-start">
      <CheckCircleIcon className="w-5 text-green-500 mt-0.5" />
      <span>A clock with this timezone is already added.</span>
    </div>
  )
}
