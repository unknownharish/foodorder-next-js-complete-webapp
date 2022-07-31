import Image from 'next/image'
import { useState } from 'react'

import styles from '/styles/Checkout.module.css'




export default function Checkout_Item_list() {

    const [item, setitem] = useState({
        src: '/img/foodlist1.png',
        name:'Hamburger',
        price:'25',
        size:'medium',
        qty:2
    })

    return (
        <div className={styles.itemlist}>
            <Image className={styles.itemimage} src={item.src} height='100' width={100} />
            <p className={styles.iteminfo}>{item.name}</p>
            <p className={styles.iteminfo}>{item.size}</p>
            {/* <p className={styles.iteminfo}>${item.price* item.qty}</p> */}
            <p className={styles.iteminfo}>${item.price}</p>
            <p className={styles.iteminfo}>${item.qty}</p>
            <Image className={styles.delete} src={'/img/trash2.svg'} height='40' width={30} />
        </div>
    )
}
