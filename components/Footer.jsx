import styles from '/styles/footer.module.css'
import Image from 'next/image'


export default function footer() { 
  return (
    <div className={styles.parent} id='contact'>

      <div className={styles.footer}> 

        {/* <p> Made by Harish and team's All rights reserved 2022 </p>  */}

        <div className={styles.contact}>

          <Image src='/img/telephone-outbound-fill.svg' height='50' width='100' />
          <p className={styles.para}>+44 565985655</p>
        </div>

        <div className={styles.message}>
          We are working 24 * 7
        </div>

      </div>

      <div className="copyright">
        Design and Developed by Harish 2022 All rights reserved .
      </div>
    </div>
  )
}
