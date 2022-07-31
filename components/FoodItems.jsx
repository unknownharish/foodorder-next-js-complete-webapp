import styles from '/styles/FoodItems.module.css'
import Foodcard from './Foodcard'

export default function FoodItems() {
    return (

        <>
            <h2>Foods we Offer ..!</h2>
            <div className={styles.fooditems}>


                <Foodcard />
                <Foodcard />
                <Foodcard />
                <Foodcard />
                <Foodcard />
                <Foodcard />

            </div>
        </>
    )
}
