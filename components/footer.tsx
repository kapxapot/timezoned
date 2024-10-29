import GitHubIcon from "./github-icon";
import Copyright from "./copyright";

export default function Footer() {
  return (
    <footer className="text-sm w-full py-2 px-3 text-gray-500 bg-white border-t border-gray-200 shadow flex flex-col sm:flex-row flex-wrap gap-3 items-center justify-between dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600">
      <div>
        <div>
          <Copyright baseYear={2023} name="Timezoned" />
          <div>
            Created by <a href="https://github.com/kapxapot" className="font-semibold hover:underline">👨‍💻 Sergey Atroshchenko</a>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 flex items-center gap-5">
        <div>
          <a href="https://github.com/kapxapot/timezoned" target="_blank">
            <GitHubIcon className="fill-gray-600 dark:fill-gray-400 w-8 h-8 opacity-50 hover:opacity-100 transition-opacity" />
          </a>
        </div>

        <div className="flex-shrink-0 dark:opacity-50">
          <a href="https://www.producthunt.com/products/timezoned/reviews" target="_blank">
            <img src="https://api.producthunt.com/widgets/embed-image/v1/product_review.svg?product_id=527753&theme=neutral" alt="Timezoned - A simple but useful timezone helper | Product Hunt" width="167" height="36" />
          </a>
        </div>
      </div>
    </footer>
  )
}
