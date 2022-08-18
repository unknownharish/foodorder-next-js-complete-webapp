import axios from 'axios';
import Image from 'next/image'
import { useRouter } from 'next/router';
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addProduct } from '../../REDUX/createSlice'

import styles from '/styles/product_id_.module.css'


export default function Fooddisplay(props) {

    let user = useSelector(x => x.user);
    let dispatch = useDispatch();
    console.log('from props', props);

    if (props.response.error) {
        return <h2 style={{ "height": "78vh" }}>No data found go to home page</h2>
    }

    const [productdesc, setproductdesc] = useState({})

    setproductdesc({
        _id: props.response._id,
        price: {
            0: props.response.price[0],
            1: props.response.price[1],
            2: props.response.price[2],
        },
        desc: props.response.desc,
        image: props.response.img,
        name: props.response.name,
        addOn: [...props.response.extras]
    })

    // {
    //     price: {
    //         0: 10,
    //         1: 20,
    //         2: 30,
    //     },
    //     desc: 'desc',
    //     image: 'https://media.istockphoto.com/photos/sunset-waterfall-picture-id483822568',
    //     name: 'name',
    //     addOn: [{ text: 'abc', price: 10 }]
    // }



    let [price, setprice] = useState({})    // calculated price include extras + no of qty
    setprice({ size: 'small', price: productdesc.price[0] })
    
    const [qty, setqty] = useState(1)



    function addMorePrice(e) {

        if (e.target.checked) {

            setprice({ size: price.size, price: price.price + parseInt(e.target.value) })
        }
        else {
            setprice({ size: price.size, price: price.price - parseInt(e.target.value) })
            // setprice(price.price - parseInt(e.target.value))

        }


    }


    function updateProduct(e) {

        let obj = {
            _id: productdesc._id,
            name: productdesc.name,
            desc: productdesc.desc,
            img: productdesc.image,
            price: price.price,
            qty: parseInt(qty),
            size: price.size
        }

        dispatch(addProduct(obj))


    }


    //img loader
    const myLoader = ({ src, width, quality }) => {
        return `${src}`
    }


    return (
        <>

            <div className={styles.container}>

                <div className={styles.left}>
                    <Image
                        loader={myLoader}
                        src={productdesc.image}
                        height={500}
                        width={500}
                    />

                </div>
                <div className={styles.right}>

                    <h2>{productdesc.name}</h2>
                    <div className={styles.innerdetails}>
                        <p className={styles.price}>${price.price * qty}</p>


                        <p>{productdesc.desc}</p>
                    </div>

                    <h3 className={styles.h3}>Order size..</h3>
                    <div className={styles.sizeImages}>

                        <input type="radio" name="type" id="small" onClick={() => setprice({ size: 'sml', price: productdesc.price[0] })} />
                        <label htmlFor="small"><Image src={'/img/logo.png'} height={50} width={50} /> </label>
                        <input type="radio" name="type" id="medium" onClick={() => setprice({ size: 'med', price: productdesc.price[1] })} />
                        <label htmlFor="medium"><Image src={'/img/logo.png'} height={80} width={80} /> </label>
                        <input type="radio" name="type" id="large" onClick={() => setprice({ size: 'lrg', price: productdesc.price[2] })} />
                        <label htmlFor="large"><Image src={'/img/logo.png'} height={100} width={100} /> </label>

                    </div>


                    <div>
                        <input className={styles.quantity} type="number" min={1} id="" value={qty} onChange={(e) => setqty(e.target.value)} />
                    </div>


                    <div className={styles.extra}>


                        {productdesc.addOn.map(extra => {


                            return <>
                                <input className={styles.checkbox} type="checkbox" name="" id={extra.text} value={extra.price} onClick={e => addMorePrice(e)} />
                                <label htmlFor={extra.text}> {extra.text}</label>
                            </>
                        })}

                        {/* 
                    <input className={styles.checkbox} type="checkbox" name="" id="Extra cheese" />
                    <label htmlFor="Extra cheese"> Extra cheese</label>
                    <input className={styles.checkbox} type="checkbox" name="" id="fried" />
                    <label htmlFor="fried"> Fried</label>

                    <input className={styles.checkbox} type="checkbox" name="" id="Chilly" />
                    <label htmlFor="Chilly"> Chilly</label> */}



                    </div>

                    <input className={styles.addtocart} type="button" value="Add to Cart" onClick={e => updateProduct(e)} />

                </div>


            </div>
        </>
    )
}



export async function getServerSideProps(context) {


    let { params } = context;
    // console.log('in ssp ', params)

    let res = await axios.get(`http://localhost:3000/api/product/${params.id}`)
    // console.log(res);


    return {
        props: {
            name: 'harish',
            response: res.data
        }
    }





}