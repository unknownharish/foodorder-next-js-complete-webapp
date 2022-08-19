import styles from '/styles/FoodItems.module.css'
import Foodcard from './Foodcard'

export default function FoodItems({ foodlist }) {

    // console.log(foodlist)
    return (

        <>
            <h2>Foods we Offer ..!</h2>
            <div className={styles.fooditems}>
               
               
               {foodlist.data.map(x=><Foodcard key={x._id} food={x}/>)} 
                


            </div>
        </>
    )
}
