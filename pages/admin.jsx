import axios from 'axios'
import React, { useState } from 'react'
import styles from '/styles/admin.module.css'
import Image from 'next/image'
import NewProduct from '../components/NewProduct'



import { setTotalOrders } from '../REDUX/createSlice';
import { useDispatch, useSelector } from 'react-redux'

export default function Admin({ totalProducts, totalOrders }) {

    let dispatch = useDispatch();
    let state = useSelector(x => x.user)

    // console.log(totalProducts, totalOrders)
    const [Orders, setOrders] = useState(totalOrders)
    const [newProductScreen, setnewProductScreen] = useState(false)
    const [orderStatus, setorderStatus] = useState({
        0: 'paid',
        1: 'preparing',
        2: 'on the way',
        3: 'delivered'
    })




    //

    async function changeStatus(id) {


        console.log(id)

        let ORDER = Orders.filter(x => x._id == id)
        let newStatus = ((parseInt(ORDER['0'].status) + 1) % 4)

        let { data } = await axios.put(`https://foodorder.vercel.app/api/order/${id}`, {
            status: newStatus
        })
        // console.log('response', data)

        if (!data.error) {
            ORDER['0'].status = data.data.status;


            setOrders([...Orders.filter(x => x._id != data.data._id ? x : ORDER['0'])])
            console.log(Orders)
        }
    }

    // delete order

    let deleteOrder = async (id) => {

        confirm('sure want to delete')

        let { data } = await axios.delete(`https://foodorder.vercel.app/api/order`, {

            data: { '_id': id }

        })

        console.log(data);

        if (data.order.deletedCount) {
            setOrders([...Orders.filter(x => x._id != id)])

        }

    }





    return (
        <>

            {newProductScreen && <NewProduct setnewProductScreen={setnewProductScreen} />}
            <div className={styles.admin}>

                <div className={styles.left}>

                    <h3 className={styles.rightHeading + ' ' + 'mx-3 my-2'}>Food Lists</h3>
                    <div className={styles.productRender}>
                        {totalProducts.map((x, idx) => {
                            // console.log(x);
                            const myLoader = ({ src, width, quality }) => {
                                return `${src}`
                            }
                            return (
                                <div key={idx} className={styles.singleProductRender}>
                                    <Image loader={myLoader} src={x.img} height={20} width={40} />
                                    <p>{x.name.slice(0, 5) + '..'}</p>

                                    <input type="button" className={styles.editButton} title='Update details' value="Update" />
                                    <input type="button" className={styles.viewButton} title='delete this product' value="Delete" />

                                </div>)



                        })}

                    </div>




                </div>
                <div className={styles.right}>
                    <div className={styles.orderRender}>
                        <h3 className={styles.rightHeading + ' ' + 'mx-3 my-2'}>Order Status</h3>
                        {Orders.map((x, idx) => {
                            // console.log('rendering data ', x);

                            return <div key={idx} className={styles.singleOrderRender}>
                                <p style={{ textTransform: 'capitalize' }}>{x.customer.slice(0, 6)}</p>
                                <p style={{ width: '10vh' }}>{orderStatus[x.status]}</p>
                                <p>{x.total}</p>
                                <p>{x.paymentMethod == 0 ? 'COD' : 'Done'}</p>

                                <div className={styles.rightButtons}>
                                    <input type="button" disabled={x.status == 3 ? true : false} className={styles.updateButton} title='change to next stage' value="Next stage" onClick={() => changeStatus(x._id)} />
                                    <input type="button" className={styles.cancelButton} title='cancel this order' value="Cancel Order" onClick={() => { deleteOrder(x._id) }} />
                                </div>
                            </div>

                        })}

                    </div>
                </div>



            </div>

            <input type="button" value="Add a new Product" className={styles.addnewProduct} onClick={() => { setnewProductScreen(true) }} />
        </>
    )
}


export async function getServerSideProps(context) {

    let cookies = context.req?.cookies || ''

    if (process.env.secret != cookies.token) {
        return {
            redirect: {
                destination: '/login',
                permanent: true
            }
        }
    }


    let totalProducts = await axios.get('https://foodorder.vercel.app/api/product');
    let totalOrders = await axios.get('https://foodorder.vercel.app/api/order')
    // console.log(totalOrders.data);
    return {
        props: {
            totalProducts: totalProducts['data']['data'],
            totalOrders: totalOrders['data']['order']
        }
    }
}
