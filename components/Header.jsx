import styles from '/styles/Header.module.css'


import Image from 'next/image'
import { useState } from 'react'


export default function Header() {

    const [headerht, setheaderht] = useState(0);


    function setHeader() {
        if (!headerht) {
            document.getElementById('header').style.height = '300px'
            setheaderht(1)
        }
        else {
            document.getElementById('header').style.height = '100px'
            setheaderht(0)
        }
    }




    return (
        <div className={styles.header} id='header'>



            <div className={styles.hamburger} onClick={() => { setHeader() }} >

                <div className={styles.hamburgerDiv}></div>
                <div className={styles.hamburgerDiv}></div>
                <div className={styles.hamburgerDiv}></div>

            </div>


            <div className={styles.imagePos}>
                <Image className={styles.logo} src={'/img/logo.png'} height='100px' width='100px' />
            </div>


            <div className={styles.downlist} id='downlist'>
                <ul className={styles.list}>
                    <li className={styles.listItem}> <a href="/">Home</a></li>
                    <li className={styles.listItem}> <a href="/">About</a></li>
                    <li className={styles.listItem}> <a href="/">Contact</a></li>
                    <li className={styles.listItem}><Image className={styles.svg} src={'/img/bag-check-fill.svg'} height='20px' width='20px' />
                    </li>
                    <li className={styles.listItem}> <Image className={styles.svg} src={'/img/card-checklist.svg'} height='20px' width='20px' />
                    </li>
                </ul>
            </div>




            <div className={styles.left}>

                <div className={styles.links}>
                    <a href="/">Home</a>
                </div>
                <div className={styles.links}>
                    <a href="/about">About</a>
                </div>
                <div className={styles.links}>
                    <a href="#contact">Contact</a>
                </div>
            </div>


            <div className={styles.right}>
                <div className={styles.imgContainer}>

                    <Image className={styles.svg} src={'/img/bag-check-fill.svg'} height='20px' width='20px' />
                    <div className={styles.counter}>10</div>
                </div>

                <div className={styles.imgContainer}>
                    <Image className={styles.svg} src={'/img/card-checklist.svg'} height='20px' width='20px' />

                </div>
            </div>

        </div>
    )
}
