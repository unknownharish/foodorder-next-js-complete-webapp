import axios from 'axios'
import React, { useState } from 'react'
import styles from '/styles/login.module.css'
import { useRouter } from 'next/router'

export default function login() {

    const [name, setname] = useState('')
    const [Pass, setPass] = useState('')
    const [error, seterror] = useState(false)

    const router = useRouter();


    let makeLogin = async () => {

        let data = await axios.post('http://localhost:3000/api/login', { username: name, password: Pass })

        // console.log(data.data);

        if (data.data.error) {
            seterror(true)
        }

        else {
            router.push('/admin')
        }
        setTimeout(() => {
            seterror(false)
        }, 1500);


    }
    return (
        <div className={styles.loginScreen + ' ' + "center"} >


            <div className={styles.login + ' ' + "center-col"}>
                <h2>Admin Login</h2>
                <div >
                    <input className={styles.input} type="text" placeholder="Username" required value={name} onChange={(e) => setname(e.target.value)} />
                </div>
                <div >
                    <input className={styles.input} type="password" placeholder="***" required value={Pass} onChange={(e) => setPass(e.target.value)} />
                </div>
                <input className={styles.button} type="button" value="LOGIN" onClick={(e) => { makeLogin() }} />
                {error && <span className={styles.error}>Wrong details..!</span>}
            </div>
        </div>
    )
}
