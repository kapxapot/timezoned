import { ThemeProps } from "flowbite-react";

export const flowbiteTheme: ThemeProps = {
  theme: {
    badge: {
      root: {
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
