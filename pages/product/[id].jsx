import Image from 'next/image'
import { useState } from 'react'
import styles from '/styles/product_id_.module.css'


export default function Fooddisplay(props) {

    let productdesc = {
        price: {
            1: '15',
            2: '25',
            3: '35' 
        },
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, voluptatum suscipit alias earum obcaecati animi voluptates numquam quasi nesciunt iusto.',
        image: '/img/foodlist1.png',
        name: 'Hamburger'

    }

    const [price, setprice] = useState(productdesc.price['1'])
    const [qty, setqty] = useState(1)

    return (

        <div className={styles.container}>

            <div className={styles.left}>
                <Image src={productdesc.image} height={500} width={500} />

            </div>
            <div className={styles.right}>

                <h2>{productdesc.name}</h2>
                <div className={styles.innerdetails}>
                    <p className={styles.price}>${price * qty}</p>


                    <p>{productdesc.desc}</p>
                </div>

                <h3 className={styles.h3}>Order size..</h3>
                <div className={styles.sizeImages}>

                    <input type="radio" name="type" id="small" onClick={()=>setprice(productdesc.price['1'])} />
                    <label htmlFor="small"><Image src={'/img/logo.png'} height={50} width={50} /> </label>
                    <input type="radio" name="type" id="medium" onClick={()=>setprice(productdesc.price['2'])}  />
                    <label htmlFor="medium"><Image src={'/img/logo.png'} height={80} width={80} /> </label>
                    <input type="radio" name="type" id="large" onClick={()=>setprice(productdesc.price['3'])}  />
                    <label htmlFor="large"><Image src={'/img/logo.png'} height={100} width={100} /> </label>

                </div>


                <div>
                    <input  className={styles.quantity} type="number" min={1} id="" value={qty} onChange={(e)=>setqty(e.target.value)} />
                </div>


                <div className={styles.extra}>

                    <input  className={styles.checkbox} type="checkbox" name="" id="topings" />
                    <label htmlFor="topings"> Topings</label>

                    <input  className={styles.checkbox} type="checkbox" name="" id="Extra cheese" />
                    <label htmlFor="Extra cheese"> Extra cheese</label>
                    <input  className={styles.checkbox} type="checkbox" name="" id="fried" />
                    <label htmlFor="fried"> Fried</label>

                    <input  className={styles.checkbox} type="checkbox" name="" id="Chilly" />
                    <label htmlFor="Chilly"> Chilly</label>



                </div>

                <input className={styles.addtocart} type="button" value="Add to Cart" />

            </div>


        </div>
    )
}


