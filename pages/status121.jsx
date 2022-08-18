import Image from 'next/image';
import { useState } from 'react'
import styles from '/styles/status.module.css'


export default function status() {


    const [active, setactive] = useState({
        done: 'done',
        active: 'active',
        pending: 'pending',

    });
    let images = { 
        'payment': '/img/card.svg',
        'cook': '/img/cook.svg',
        'deliver': '/img/deliver.svg',
        'done': '/img/done.svg'
    }

    function returnClass(type) {
        if (type === active.done) return styles.done
        if (type === active.active) return styles.animate
        if (type === active.pending) return styles.pending

    }

    return (
        <div className={styles.container}>


            <div className={styles.left}>


                <table>

                    <tbody>
                        <tr >
                            <td>
                                <span className={styles.head}>
                                    Order Id
                                </span>
                            </td>
                            <td>
                                <span className={styles.head}>
                                    Customer
                                </span>
                            </td>
                            <td>
                                <span className={styles.head}>
                                    Address
                                </span>
                            </td>
                        </tr>
                        <tr >
                            <td>
                                <span className={styles.row}>
                                    10102
                                </span>
                            </td>
                            <td>
                                <span className={styles.row}>
                                    Harish
                                </span>
                            </td>
                            <td>

                                <span className={styles.row}>
                                    121 street south california

                                </span>
                            </td>
                        </tr>
                    </tbody>


                </table>


                <div className={styles.status}>
                    <div className={returnClass('done')}>
                        <Image src={images.payment} height='30' width={30} />
                        <p>Paid</p>
                        <Image src={'/img/greencheck.svg'} height='30' width={33} />
                    </div>
                    <div className={returnClass('active')}>
                        <Image src={images.cook} height='30' width={30} />
                        <p>Preparing</p>
                        <Image src={'/img/greencheck.svg'} height='30' width={33} />
                    </div>
                    <div className={returnClass('pending')}>
                        <Image src={images.deliver} height='30' width={30} />
                        <p>On the way</p>
                        <Image src={'/img/greencheck.svg'} height='30' width={33} />
                    </div>
                    <div className={returnClass('pending')}>
                        <Image src={images.done} height='30' width={30} />
                        <p>Delivered</p>
                        <Image src={'/img/greencheck.svg'} height='30' width={33} />
                    </div>

                </div>






            </div>
            <div className={styles.mid}>
                <h4>Total</h4>
                <p className={styles.amount}>$80</p>
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


                    <input className={styles.proceed} type="button" value="Paid" />
                </div>
            </div>

        </div>
    )
}
