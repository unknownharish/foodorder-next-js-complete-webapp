import styles from '/styles/Caresoul.module.css'

import { useState } from 'react'
import Image from 'next/image'

export default function Caresoul() {
 
    const [index, setindex] = useState(0);

    let sliders = ['/img/foodimage1.jpeg', '/img/foodimage2.png', '/img/foodimage3.jpeg', '/img/foodimage4.jpeg',];
    // let sliders = ['/img/foodimage1.jpeg'];
 

    function changeIndex(direction) {
        let idx;
        if (direction == 'l') {

            idx = index - 1
            idx == -1 ? setindex(3) : setindex(idx)
        }
        else {

            idx = index + 1
            idx > 3 ? setindex(0) : setindex(idx)
        }

        console.log(index)



    }



    return (
        <div className={styles.caresoul}>



            <div style={{ left: '10%' }} className={styles.arrowContainer}>
                <Image className={styles.navbutton} src={'/img/leftbutton.svg'} height='50px' width='50px' onClick={() => changeIndex('l')} />
            </div>


            <div className={styles.wrapper} style={{ transform: `translateX(${-100 * index}vw)` }}>


                {sliders.map((img, key) => {

                    return <>

                        <div className={styles.image}>

                            <Image className={styles.singleImage} key={key} src={img} layout='fill' objectFit='cover' />
                        </div>
                    </>
                })}

            </div>

            <div style={{ right: '10%' }} className={styles.arrowContainer}>
                <Image className={styles.navbutton} src={'/img/rightbutton.svg'} height='50px' width='50px' onClick={() => changeIndex('r')} />
            </div>




        </div>
    )
}
