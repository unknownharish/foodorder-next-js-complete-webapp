import axios from 'axios';
import Image from 'next/image';
import { useState, useEffect } from 'react'
import styles from '/styles/status.module.css'


export default function Status({ data }) {


  // console.log(data);

  if (data.error) {
    return <>
      <div style={{ height: '78vh' }}>
        <h1 style={{ textAlign: 'center' }}>Invalid details</h1>
      </div>
    </>
  }

  const [active, setactive] = useState({
    done: 'done',
    animate: 'animate',
    pending: 'pending',

  });
  const [activeclasss, setactiveclasss] = useState(['done', 'animate', 'pending', 'pending']);



  let images = {
    'payment': '/img/card.svg',
    'cook': '/img/cook.svg',
    'deliver': '/img/deliver.svg',
    'done': '/img/done.svg'
  }

  useEffect(() => {


    if (data.data.status == 1) {
      setactiveclasss(['done', 'done', 'animate', 'pending'])
    }
    if (data.data.status == 2) {
      setactiveclasss(['done', 'done', 'done', 'animate'])
    }
    if (data.data.status == 2) {
      setactiveclasss(['done', 'done', 'done', 'done'])
    }


  }, [])



  function returnClass(type) {



    if (type === active.done) return styles.done
    if (type === active.animate) return styles.animate
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
                  {data.data._id}
                </span>
              </td>
              <td>
                <span className={styles.row}>
                  {data.data.customer}
                </span>
              </td>
              <td>

                {/* <span className={styles.row + styles.address} > */}
                <span className={styles.address} >
                  {data.data.address}

                </span>
              </td>
            </tr>
          </tbody>


        </table>


        <div className={styles.status}>
          <div className={returnClass(activeclasss[0])}>
            <Image src={images.payment} height='30' width={30} />
            <p>Paid</p>
            <Image src={'/img/greencheck.svg'} height='30' width={33} />
          </div>
          <div className={returnClass(activeclasss[1])}>
            <Image src={images.cook} height='30' width={30} />
            <p>Preparing</p>
            <Image src={'/img/greencheck.svg'} height='30' width={33} />
          </div>
          <div className={returnClass(activeclasss[2])}>
            <Image src={images.deliver} height='30' width={30} />
            <p>On the way</p>
            <Image src={'/img/greencheck.svg'} height='30' width={33} />
          </div>
          <div className={returnClass(activeclasss[3])}>
            <Image src={images.done} height='30' width={30} />
            <p>Delivered</p>
            <Image src={'/img/greencheck.svg'} height='30' width={33} />
          </div>

        </div>






      </div>
      {/* <div className={styles.mid}>
        <h4>Total</h4>
        <p className={styles.amount}>${data.data.total}</p>
      </div> */}
      <div className={styles.right}>
        <h2>Grand Total</h2>

        <div className={styles.details}>
          <div className={styles.div}>
            <p className={styles.key}> Subtotal</p>
            <p>${data.data.total}</p>
          </div>
          <div className={styles.div}>
            <p className={styles.key}> Discount</p>
            <p> ${0}</p>
          </div>



          <div className={styles.div}>
            <p className={styles.total}> Total</p>
            <p>${data.data.total}</p>
          </div>


          <input className={styles.proceed} type="button" value={data.data.paymentMethod == 1 ? 'Paid' : 'Cash On Delivery'} />
        </div>
      </div>

    </div>
  )
}



export async function getServerSideProps(context) {

  let { _id } = context.query
  console.log('ssp', _id)
  let { data } = await axios.get(`http://localhost:3000/api/order/${_id}`)
  return {
    props: {
      data
    }
  }
}
