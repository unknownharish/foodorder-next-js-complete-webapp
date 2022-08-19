

import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Caresoul from '../components/Caresoul'
import FoodItems from '../components/FoodItems'
import axios from 'axios'



export default function Home(props) {



  return (
    <div className={styles.container}>
      <Head>
        <title> Food ordering App</title>
        <meta name="description" content="developed with next.js this a a food ordering app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Caresoul />
      <FoodItems foodlist={props.foodlist} />


    </div>
  )
}

export async function getServerSideProps() {

  try {


    let response = await axios.get('https://foodorder-eight.vercel.app/api/product');
    // console.log(response);


    return {
      props: {
        foodlist: response.data
      }
    }

  } catch (error) {
    console.log(error)
    return {
      props: {
        foodlist: []
      }
    }
  }
}
