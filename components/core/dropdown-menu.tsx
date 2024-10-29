import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export interface MenuItem {
  label: string;
  action: () => void;
  className?: string;
}

interface Props {
  label: string;
  items: MenuItem[];
}

export function DropdownMenu(props: Props) {
  return (
    <Menu as="div" className="relative inline-block">
      <Menu.Button>
        <h3 className="inline-flex pl-3">
          <span className="font-bold dark:text-gray-200">
            {props.label}
          </span>
          <ChevronDownIcon
            className="ml-1 -mb-1 w-5 hover:opacity-50 dark:text-gray-400"
            aria-hidden="true"
          />
        </h3>
      </Menu.Button>
      <Menu.Items className="absolute mt-2 divide-y right-0 divide-gray-100 dark:divide-gray-500 rounded-md bg-white  dark:bg-gray-800 shadow-lg ring-1 ring-black dark:ring-gray-700 ring-opacity-5 focus:outline-none">
        {props.items.map(item => (
          <Menu.Item key={item.label}>
          {({ active }) => (
            <button
              className={`${active && "bg-slate-100 dark:bg-slate-700"} w-full text-left block py-1 px-4 whitespace-nowrap ${item.className ?? "dark:text-gray-400"}`}
              onClick={item.action}
            >
              {item.label}
            </button>
          )}
        </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  )
}
