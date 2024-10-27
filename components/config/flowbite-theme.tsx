import { ThemeProps } from "flowbite-react";

export const flowbiteTheme: ThemeProps = {
  theme: {
    badge: {
      root: {
        color: {
          success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 group-hover:bg-green-200 dark:group-hover:bg-green-300',
          indigo: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-300',
          pink: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200 group-hover:bg-pink-200 dark:group-hover:bg-pink-300',
        },
        size: {
          xs: 'text-xs'
        }
      },
      icon: {
        off: 'rounded px-1.5 py-0.5'
      }
    },
    navbar: {
      root: {
        base: "border-gray-200 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-800",
        inner: {
          base: "flex flex-wrap items-center justify-between"
        }
      }
    },
    textInput: {
      field: {
        input: {
          base: 'focus:outline-blue-500 block w-full border disabled:cursor-not-allowed disabled:opacity-50'
        }
      }
    }
  }
};
