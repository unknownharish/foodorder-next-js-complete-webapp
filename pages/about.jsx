import Image from 'next/image'
import React from 'react'
import styles from '/styles/about.module.css'


export default function about() {
    return (
        <div className={styles.about}>
            <div className={styles.image}>
                <Image src={'/img/background4.jpg'} height={600} width={800} />
                <p className={styles.para}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo libero corporis ad? Officiis eos sapiente optio quis, animi dicta error provident quas dolorum? Exercitationem enim rerum modi incidunt atque accusamus ullam tempore rem? Voluptatem delectus reiciendis sunt, ipsam nisi iure soluta in sapiente repellat praesentium possimus magni consectetur, consequuntur totam.</p>
            </div>
            <div className={styles.image}>
                <p className={styles.para}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo libero corporis ad? Officiis eos sapiente optio quis, animi dicta error provident quas dolorum? Exercitationem enim rerum modi incidunt atque accusamus ullam tempore rem? Voluptatem delectus reiciendis sunt, ipsam nisi iure soluta in sapiente repellat praesentium possimus magni consectetur, consequuntur totam.</p>
                <Image src={'/img/background4.jpg'} height={600} width={800} />
            </div>
        </div>
    )
}
