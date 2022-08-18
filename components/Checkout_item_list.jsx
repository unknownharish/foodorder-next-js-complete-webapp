import Image from 'next/image'
import { useState } from 'react'


import styles from '/styles/Checkout.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { remove } from '../REDUX/createSlice'



export default function Checkout_Item_list({ food }) {

    const dispatch = useDispatch();


    const [item, setitem] = useState({
        src: '/img/foodlist1.png',
        name: 'Hamburger',
        price: '25',
        size: 'medium',
        qty: 2
    })

    function removeProduct() {
        dispatch(remove({ _id: food._id }))
    }


    const myLoader = ({ src, width, quality }) => {
        return `${src}`
    }


    return (
        <div className={styles.itemlist}>
            <Image className={styles.itemimage} loader={myLoader} src={food.img} height='100' width={100} />
            <p className={styles.iteminfo +' '+ styles.font}>{food.name.slice(0, 8)}</p>
            <p className={styles.iteminfo}>{food.size}</p>
            {/* <p className={styles.iteminfo}>${item.price* item.qty}</p> */}
            <p className={styles.iteminfo}>{food.qty}</p>
            <p className={styles.iteminfo}>${food.price * food.qty}</p>
            <Image className={styles.delete} src={'/img/trash2.svg'} height='40' width={30} title='Delete item' onClick={() => removeProduct()} />
        </div>
    )
}
