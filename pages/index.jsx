import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Caresoul from '../components/Caresoul'
import FoodItems from '../components/FoodItems'
import Header from '/components/Header'
import Footer from '/components/Footer'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title> Food ordering App</title>
        <meta name="description" content="developed with next.js this a a food ordering app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Caresoul />
      <FoodItems/>


    </div>
  )
}
