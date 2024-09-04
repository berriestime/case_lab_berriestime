import Head from 'next/head';
import { PhotosPage } from './Photos.js';
import styles from '@/styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>Gallery</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className={`${styles.main}`}>
        <PhotosPage />
      </main>
    </>
  );
}
