import React from 'react'
import Image from 'next/image';

export default function Spinner() {
    return (

        <div className='blur'>

            <div className='loader'>

                <Image src={'/img/loader.gif'} height={100} width={100} />

            </div>
        </div>
    )
}
