import { CheckCircleIcon } from "@heroicons/react/20/solid";

export default function ClockAlreadyAdded() {
  return (
    <div className="mt-3 flex gap-1 items-start">
      <CheckCircleIcon className="w-5 text-green-500 dark:text-green-400 mt-0.5" />
      <span className="dark:text-gray-400">A clock with this timezone is already added.</span>
    </div>
  )
}
