import styles from '/styles/Foodcard.module.css'
import Image from 'next/image';


// import img from '/img/foodlist1.png'


export default function FoodItems() {
    return (
        <div className={styles.foodcard}>

            <Image src={'/img/foodlist1.png'} height='150' width='200' objectFit='cover' />
            <p className={styles.name}>lorem</p>
            <p className={styles.para}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, veniam!</p>
            <p className={styles.price}>$20.12</p>
            <input className={styles.button} type="button" value="View " />


        </div>
    )
}
