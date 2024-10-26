import GitHubIcon from "./github-icon";
import Copyright from "./copyright";

export default function Footer() {
  return (
    <footer className="text-sm w-full py-2 px-3 text-gray-500 bg-white border-t border-gray-200 shadow flex flex-wrap gap-3 items-center justify-between dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600">
      <div className="flex items-center gap-3">
        <div>
          <Copyright baseYear={2023} name="Timezoned" />
          <div>
            Created by <a href="https://github.com/kapxapot" className="font-semibold hover:underline">👨‍💻 Sergey Atroshchenko</a>
          </div>
        </div>
        <div>
          <a href="https://github.com/kapxapot/timezoned" target="_blank">
            <GitHubIcon className="fill-gray-600 dark:fill-gray-400 w-8 h-8 opacity-50 hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>

      <div className="flex-shrink-0">
        <a href="https://www.producthunt.com/products/timezoned/reviews" target="_blank">
          <img src="https://api.producthunt.com/widgets/embed-image/v1/product_review.svg?product_id=527753&theme=neutral" alt="Timezoned - A simple but useful timezone helper | Product Hunt" width="250" height="54" />
        </a>
      </div>

      <div>
        You can ☕ <a className="md:font-semibold hover:underline" href="https://www.buymeacoffee.com/kapxapot">buy me a coffee</a> or 💳 <a className="md:font-semibold hover:underline" href="https://pay.cloudtips.ru/p/064a10db">pay me a tip</a>
      </div>
    </footer>
  )
}
