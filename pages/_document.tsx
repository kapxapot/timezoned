import { Html, Head, Main, NextScript } from 'next/document'
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-indigo-100">
        <Main />
        <NextScript />
        <Script
          data-name="BMC-Widget"
          data-cfasync="false"
          src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
          data-id="kapxapot"
          data-description="Support me on Buy me a coffee!"
          data-message="Thank you for visiting! If you like this page you can buy me a coffee!"
          data-color="#BD5FFF"
          data-position="Right"
          data-x_margin="10"
          data-y_margin="67"
          strategy="beforeInteractive"
          defer={false}
        />
      </body>
    </Html>
  )
}
