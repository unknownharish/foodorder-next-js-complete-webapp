import styles from '/styles/Checkout.module.css'

import { useState } from 'react'
import Checkout_Item_list from '../components/Checkout_item_list'

export default function checkout() {


  const [items, setfirst] = useState([{
    src: '/img/foodlist1.png',
    name: 'Hamburger',
    price: '25',
    size: 'medium',
    qty: 2
  }, {
    src: '/img/foodlist1.png',
    name: 'Hamburger',
    price: '25',
    size: 'medium',
    qty: 2 
  }])







  return (
    <div className={styles.container}>

      <div className={styles.left}>
        <Checkout_Item_list />
        <Checkout_Item_list />
        <Checkout_Item_list />
        <Checkout_Item_list />
        <Checkout_Item_list />
        <Checkout_Item_list />
        <Checkout_Item_list />

      </div>
      <div className={styles.right}>
        <h2>Grand Total</h2>

        <div className={styles.details}>
          <div className={styles.div}>
            <p className={styles.key}> Subtotal</p>
            <p>${50}</p>
          </div>
          <div className={styles.div}>
            <p className={styles.key}> Discount</p>
            <p> ${0}</p>
          </div>
         
      

          <div className={styles.div}>
            <p className={styles.total}> Total</p>
            <p>${50}</p>
          </div>


<input className={styles.proceed} type="button" value="Proceed" />
        </div>
      </div>
    </div>
  )
}
