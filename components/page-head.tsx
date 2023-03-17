import Head from "next/head";

export default function PageHead() {
  return (
    <Head>
      <title>Timezoned</title>
      <meta name="description" content="TimeZoned - the best timezone helper! Allows tracking different timezones, compare them to the local timezone, displays and compares timelines and helps to convert times to your local timezone." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" type="image/svg+xml" href="/tz.svg" />
    </Head>
  )
}
