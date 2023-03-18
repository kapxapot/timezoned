import Head from "next/head";

export default function PageHead() {
  return (
    <Head>
      <title>Timezoned</title>
      <meta name="description" content="Timezoned - the best timezone helper! Allows tracking different timezones, compare them to the local timezone, displays and compares timelines and helps to convert times to your local timezone." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" type="image/svg+xml" href="/tz.svg" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="Timezoned" />
      <meta name="twitter:description" content="Timezoned - the best timezone helper!" />

      <meta property="og:title" content="Timezoned" />
      <meta property="og:description" content="Timezoned - the best timezone helper!" />
      <meta property="og:site_name" content="Timezoned" />

      <meta name="twitter:image" content="/tz.svg" />
      <meta property="og:image" content="/tz.svg" />
    </Head>
  )
}
