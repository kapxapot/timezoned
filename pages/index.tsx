import Head from 'next/head';
import Clock from '@/components/clock';

export default function Home() {
  return (
    <>
      <Head>
        <title>Timezoned</title>
        <meta name="description" content="Timezone helper" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center items-start h-screen pt-5">
        <Clock name="Local Time" />
      </main>
    </>
  )
}
