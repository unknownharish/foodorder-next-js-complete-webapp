import styles from '/styles/Header.module.css'


import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'


export default function Header() {

    const [headerht, setheaderht] = useState(0);
    let user = useSelector(x => x.user)


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
                    <li className={styles.listItem}> <Link href={'/'}>Home</Link></li>
                    <li className={styles.listItem}><Link href={'/about'}>About</Link></li>
                    <li className={styles.listItem}><Link href={'/contact'}>contact</Link></li>
                    <li className={styles.listItem}>
                        <Link href={'/checkout'}>
                            <Image className={styles.svg} src={'/img/bag-check-fill.svg'} height='20px' width='20px' />
                        </Link>
                    </li>
                    <li className={styles.listItem}>
                        <Link href={'/checkout'}>
                            <Image className={styles.svg} src={'/img/card-checklist.svg'} height='20px' width='20px' />
                        </Link>
                    </li>
                </ul>
            </div>




            <div className={styles.left}>

                <div className={styles.links}>
                    <Link href='/' >
                        Home

                    </Link>
                </div>
                <div className={styles.links}>
                    <Link href='/about' >
                        About

                    </Link>
                </div>
                <div className={styles.links}>
                    <Link href='/contact' >
                        Contact

                    </Link>
                </div>
            </div>


            <div className={styles.right}>
                <div className={styles.imgContainer}>
                    <Link href={'/checkout'}>
                        <Image className={styles.svg} src={'/img/bag-check-fill.svg'} height='20px' width='20px' />
                    </Link>
                    <div className={styles.counter}>{user.products.length}</div>
                </div>

                <div className={styles.imgContainer}>
                    <Image className={styles.svg} src={'/img/card-checklist.svg'} height='20px' width='20px' />

                </div>
            </div>

        </div>
    )
}
