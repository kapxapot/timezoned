import GitHubIcon from "./github-icon";
import Copyright from "./copyright";

export default function Footer() {
  return (
    <footer className="text-sm w-full py-2 px-3 text-gray-500 bg-white border-t border-gray-200 shadow flex flex-col sm:flex-row flex-wrap gap-3 items-center justify-between dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600">
      <div className="text-center sm:text-left">
        <Copyright baseYear={2023} name="Timezoned" />
        <div>
          Created by <a href="https://github.com/kapxapot" className="font-semibold hover:underline">👨‍💻 Sergey Atroshchenko</a> <a href="https://www.buymeacoffee.com/kapxapot" title="Buy me a coffee">☕</a>
        </div>
      </div>

      <div className="flex-shrink-0 flex items-center gap-3">
        <div>
          <a href="https://github.com/kapxapot/timezoned" target="_blank">
            <GitHubIcon className="fill-gray-600 dark:fill-gray-400 w-8 h-8 opacity-50 hover:opacity-100 transition-opacity" />
          </a>
        </div>

        <div className="text-right flex sm:flex-col gap-x-2">
          <span>My new project:</span>
          <a href="https://mapfolks.com" className="font-semibold hover:underline" target="_blank">🗺️ Mapfolks</a>
        </div>
      </div>
    </footer>
  )
}
