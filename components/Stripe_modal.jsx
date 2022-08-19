import axios from 'axios';
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styles from '/styles/stripe-modal.module.css'
import { useSelector, useDispatch } from 'react-redux'


import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { setLoading } from '../REDUX/createSlice';
import Image from 'next/image';



export default function Stripe_modal({ setcardPayment }) {

    const router = useRouter()
    const stripe = useStripe();
    const elements = useElements();

    const user = useSelector(x => x.user)
    const dispatch = useDispatch()
    {/* name, address,city,state,country */ }
    const [name, setname] = useState('')
    const [address, setaddress] = useState('');
    const [city, setcity] = useState('');
    const [state, setstate] = useState('');
    const [country, setcountry] = useState('')
    const [postalcode, setpostalcode] = useState()

    let total_amount = 0;
    user.products.map(x => {
        total_amount += x.qty * x.price
    })

    const cardStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#32325d"
                }
            },
            invalid: {
                fontFamily: 'Arial, sans-serif',
                color: "#fa755a",
                iconColor: "#fa755a"
            }
        }
    };

    // change visibility

    function changeVisibility() {
        setcardPayment(false)
    }


    //card payment handler
    async function handler(e) {

        e.preventDefault()

        if (!name || !address || !state || !country || !postalcode) {
            alert('Please fill out form')
            dispatch(setLoading({ value: false }))
            return
        }
        else {
            try {
                dispatch(setLoading({ value: true }))

                // console.log(name, address, city, state, country);

                // generate payment id by stripe
                const { paymentMethod, error } = await stripe.createPaymentMethod({
                    type: 'card',
                    card: elements.getElement(CardElement),

                })

                if (error) {
                    return;
                    dispatch(setLoading({ value: false }))
                }

                else {



                    // creating client secret by backend
                    let { data } = await axios.post('https://foodorder.vercel.app/api/stripe', {
                        id: paymentMethod.id,
                        amount: total_amount,
                        currency: 'inr',
                        name,
                        address,
                        city,
                        state,
                        country, postalcode
                    })


                    // console.log('backend', data);

                    let client_secret = data.client_secret;

                    //confirm card paymnet by stripe
                    let stripeResponse = await stripe.confirmCardPayment(client_secret);

                    if (stripeResponse.error) {
                        alert('Transaction failed')
                    }




                    // if not hava error then save user details


                    let orderSave = await axios.post('https://foodorder.vercel.app/api/order', {
                        customer: name,
                        address: address,
                        total: total_amount,
                        status: 0,
                        paymentMethod: 1

                    })

                    if (!orderSave.data.error) {
                        // console.log(orderSave.data);
                        router.push(`/status/${orderSave.data.response._id}`)
                    }

                }


                dispatch(setLoading({ value: false }))


            } catch (err) {
                console.log(err);
                dispatch(setLoading({ value: false }))
            }
        }


        // console.log(paymentMethod);

    }


    // handler for cashOn delivery

    async function cashOnDelivery() {

        if (!name || !address || !state || !country || !postalcode) {
            alert('Please fill out delivery details')
            dispatch(setLoading({ value: false }))
            return
        }
        else {

            dispatch(setLoading({ value: true }))


            try {

                let orderSave = await axios.post('https://foodorder.vercel.app/api/order', {
                    customer: name,
                    address: address,
                    total: total_amount,
                    status: 0,
                    paymentMethod: 0

                })
                if (!orderSave.data.error) {
                    // console.log(orderSave.data);

                    setTimeout(() => {

                        dispatch(setLoading({ value: false }))
                        router.push(`/status/${orderSave.data.response._id}`)
                    }, 100);
                }

                dispatch(setLoading({ value: false }))

            } catch (error) {
                // console.log(error)
                dispatch(setLoading({ value: false }))
                alert('some error occurred in saving data')

            }

        }
    }





    return (

        <div className={styles.stripe}>

            <h2>User Details</h2>
            <div className={styles.cross} onClick={() => { changeVisibility() }}>
                <Image src={'/img/x.svg'} height={50} width={50} />
            </div>

            <div className={styles.userdetails + ' ' + 'my-3  center-col'} >

                <div >
                    <input className={styles.input} type="text" placeholder="Name" required value={name} onChange={(e) => setname(e.target.value)} />
                </div>
                <div >
                    <textarea className={styles.textarea + ' ' + 'my-1'} placeholder="Address" id="" cols="30" rows="10" minLength={20} required value={address} onChange={(e) => setaddress(e.target.value)} />
                </div>
                <div >
                    <input className={styles.input} type="text" placeholder="City" required value={city} onChange={(e) => setcity(e.target.value)} />
                </div>
                <div >
                    <input className={styles.input + ' ' + 'my-1'} type="text" placeholder="Postal code  eg: 110044" maxLength={6} required value={postalcode} onChange={(e) => setpostalcode(e.target.value)} />
                </div>
                <div >
                    <input className={styles.input + ' ' + 'my-1'} type="text" placeholder="State" required value={state} onChange={(e) => setstate(e.target.value)} />
                </div>
                <div >
                    <input className={styles.input} type="text" placeholder="Country" required value={country} onChange={(e) => setcountry(e.target.value)} />
                </div>


            </div>



            <h2 >Payment Gateway</h2>
            <form className={styles.form} onSubmit={(e) => handler(e)}>

                <CardElement hidePostalCode={true} options={cardStyle} />
                <input className={styles.pay} title='Pay using Card' type="submit" value={`Pay ${total_amount}.00`} />

                <input type="button" title='Cash on Delivery' value="Cash on Delivery" className={styles.cod} onClick={() => cashOnDelivery()} />
            </form>
            {/* <hr /> */}
            {/* <div className={styles.OR}>OR</div> */}
            {/* <div className={styles.div + ' ' + 'my-2'}>

            </div> */}

        </div>


    )
}
