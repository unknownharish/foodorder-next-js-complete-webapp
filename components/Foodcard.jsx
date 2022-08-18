import styles from '/styles/Foodcard.module.css'
import Image from 'next/image';
import Link from 'next/link';






export default function FoodItems(props) {


    const myLoader = ({ src, width, quality }) => { 
        return `${src}`
    }
    return (
        <div className={styles.foodcard}>

            <Image
                loader={myLoader}
                src={props.food.img}
                height='150'
                width='200'
                objectFit='cover'
            />
            <p className={styles.name}>{props.food.name}</p>
            <p className={styles.para}>{props.food.desc.slice(0,60)+'..'}</p>
            <p className={styles.price}>${props.food.price[0]}</p>
            < Link href={`product/${props.food._id}`} passHref>
            <input className={styles.button} type="button" value="View " />
            </Link>


        </div>
    )
}
