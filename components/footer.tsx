export default function Footer() {
  const baseYear = 2023;
  const now = new Date();
  const year = now.getFullYear();

  return (
    <footer className="w-full py-2 px-4 bg-white border-t border-gray-200 shadow flex gap-2 items-center justify-between dark:bg-gray-800 dark:border-gray-600">
      <div className="text-sm text-gray-500 dark:text-gray-400">
        <div>
          All rights reserved. &copy; {baseYear}{year > baseYear && (`—${year}`)} <a href="https://timezoned.vercel.app" className="font-semibold hover:underline">Timezoned</a>
        </div>
        <div>
          Created by <a href="https://about.me/kapxapot" className="font-semibold hover:underline">Sergey Atroshchenko</a>
        </div>
      </div>
      <div>
        <a href="https://github.com/kapxapot/timezoned" className="opacity-50 hover:opacity-100">
          <picture>
            <img
              src="/github.svg"
              className="w-6"
              alt="GitHub link"
            />
          </picture>
        </a>
      </div>
    </footer>
  )
}
