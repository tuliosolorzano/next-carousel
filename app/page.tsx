// import Image from "next/image";
import Head from 'next/head';
import { Carousel } from '@/app/components/Carousel';

export default function Home() {
  return (
    <>
      <Head>
        <title>Next.js Carousel</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Carousel />
    </>
  );
}
