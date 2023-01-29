import Head from 'next/head';
import Clock from '@/components/clock';
import { useEffect, useState } from 'react';
import { getTimezones } from '@/lib/timezones';

export default function Home() {
  const [timezones, setTimezones] = useState<string[]>([]);

  useEffect(
    () => {
      setTimezones(getTimezones().slice(0, 30));
    },
    []
  );

  return (
    <>
      <Head>
        <title>Timezoned</title>
        <meta name="description" content="Timezone helper" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-wrap justify-center items-start p-5 gap-6">
        <Clock name="Local Time" />
        {timezones.map((timezone) => (
          <Clock name={timezone} timezone={timezone} />
        ))}
      </main>
    </>
  )
}
