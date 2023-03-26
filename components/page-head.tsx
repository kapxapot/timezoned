import Head from "next/head";

interface Props {
  host: string;
}

export default function PageHead({ host }: Props) {
  const pic = host + "/tz.svg";

  const title = "Timezoned";
  const description = "Timezoned - an awesome timezone helper!";

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={`${description} Tracks different timezones, compares them to the local one, displays and compares timelines and helps to convert times to your local timezone.`} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" type="image/svg+xml" href={pic} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={title} />

      <meta name="twitter:image" content={pic} />
      <meta property="og:image" content={pic} />
    </Head>
  )
}
