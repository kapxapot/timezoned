interface Props {
  host: string;
}

export default function Footer({ host }: Props) {
  const baseYear = 2023;
  const now = new Date();
  const year = now.getFullYear();

  return (
    <footer className="w-full py-2 px-3 bg-white border-t border-gray-200 shadow dark:bg-gray-800 dark:border-gray-600 flex gap-2 md:gap-5 items-center justify-between text-sm text-gray-500 dark:text-gray-400">
      <div className="flex flex-grow md:items-center flex-col md:flex-row md:justify-between">
        <div>
          <div>
            All rights reserved. &copy; {baseYear}{year > baseYear && (`—${year}`)} <a href={host} className="font-semibold hover:underline">Timezoned</a>
          </div>
          <div>
            Created by <a href="https://github.com/kapxapot" className="font-semibold hover:underline">👨‍💻 Sergey Atroshchenko</a>
          </div>
        </div>
        <div>
          You can ☕ <a className="md:font-semibold hover:underline" href="https://www.buymeacoffee.com/kapxapot">buy me a coffee</a> or 💳 <a className="md:font-semibold hover:underline" href="https://pay.cloudtips.ru/p/064a10db">pay me a tip</a>
        </div>
      </div>
      <div>
        <a href="https://github.com/kapxapot/timezoned" className="opacity-50 hover:opacity-100 transition-opacity">
          <picture>
            <img
              src="/github.svg"
              className="w-8"
              alt="GitHub link"
            />
          </picture>
        </a>
      </div>
    </footer>
  )
}
