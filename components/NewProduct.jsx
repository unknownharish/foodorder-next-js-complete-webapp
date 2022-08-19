import styles from '/styles/Newproduct.module.css'
import Image from 'next/image';
import { useState } from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { setLoading } from '../REDUX/createSlice'


//loader
import Spinner from './Spinner'



export default function NewProduct({ setnewProductScreen }) {


    const user = useSelector(x => x.user);
    const dispatch = useDispatch()

    const [name, setname] = useState('')
    const [Description, setDescription] = useState('');
    const [Image_url, setImage_url] = useState('');
    const [Small, setSmall] = useState('');
    const [Medium, setMedium] = useState('');
    const [Large, setLarge] = useState('');

    const [Extras, setExtras] = useState({});
    const [finalExtras, setfinalExtras] = useState([])


    // add extras input for food
    let updateExtraInput = (e) => {
        setExtras({ ...Extras, [e.target.name]: e.target.value })
    }

    // add button
    let confirmExtra = () => {
        if (Extras.text == undefined || Extras.price == undefined) {

        }
        else {

            setfinalExtras([...finalExtras, Extras]);
        }

    }

    //image data save

    let Imagedata = (url) => {
        setImage_url(url);
        console.log(url)
    }


    //save data to server and database

    let uploadingData = async () => {

        let form = new FormData();
        form.append('file', Image_url);
        form.append("upload_preset", "myuploads");   // name of preset you define in cloudinary

        try {

            dispatch(setLoading({ value: true }))

            let { data } = await axios.post('https://api.cloudinary.com/v1_1/din5l0kjn/image/upload', form)
            let URL = data.secure_url;

            let finalPass = {
                name,
                desc: Description,
                img: URL,
                price: [Small, Medium, Large],
                extras: finalExtras
            }
            let Product = await axios.post('https://myfoodorder.vercel.app/api/product', finalPass)

            if (!Product.error) {
                setname('');
                setDescription('');
                setImage_url('');
                setSmall('');
                setMedium('');
                setLarge('');
                setfinalExtras('');
                dispatch(setLoading({ value: false }))
            }
            else {
                alert('Server error !! Try again in 5 minutes')
                dispatch(setLoading({ value: false }))
            }
        } catch (e) {
            console.log(e)
            dispatch(setLoading({ value: false }))
        }


    }

    // disabled add product screen

    function changeVisibility() {
        setnewProductScreen(false)
    }
    return (
        <div className={styles.NewProduct}>
            <h3 style={{ textAlign: 'center' }}>Add New Product</h3>

            <div className={styles.cross} onClick={() => { changeVisibility() }}>
                <Image src={'/img/x.svg'} height={50} width={50} />
            </div>


            <div className={styles.userdetails + ' ' + 'my-3  center-col'} >

                <div >
                    <input className={styles.input} type="text" placeholder="Product Name" required maxLength={20} value={name} onChange={(e) => setname(e.target.value)} />
                </div>
                <div >
                    <textarea className={styles.textarea + ' ' + 'my-1'} placeholder="Description " id="" cols="30" rows="10" maxLength={200} required value={Description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div >
                    <div>  <span>Select image</span> </div>
                    <input type="file" name="Image" onChange={(e) => Imagedata(e.target.files[0])} />
                </div>
                <div >
                    <input className={styles.input + ' ' + 'my-1'} type="text" maxLength={2} placeholder="Small eg: $5" required value={Small} onChange={(e) => setSmall(e.target.value)} />
                </div>
                <div >
                    <input className={styles.input + ' ' + 'my-1'} type="text" maxLength={2} placeholder="Medium eg: $5" required value={Medium} onChange={(e) => setMedium(e.target.value)} />
                </div>
                <div >
                    <input className={styles.input + ' ' + 'my-1'} type="text" maxLength={3} placeholder="Large eg: $5" required value={Large} onChange={(e) => setLarge(e.target.value)} />
                </div>


                <div className={styles.addextras}>
                    <input className={styles.addextrasInput + ' ' + 'my-1'} type="text" placeholder="Key" name='text' onChange={(e) => updateExtraInput(e)} />
                    <input className={styles.addextrasInput + ' ' + 'my-1'} type="number" placeholder="1" name='price' onChange={(e) => updateExtraInput(e)} />

                    <input className={styles.addIt} type="button" value="Add It" onClick={() => { confirmExtra() }} />

                </div>


                <div className={styles.extrasValue}>
                    {finalExtras.length > 0 ? finalExtras.map((x, idx) => {

                        // console.log('mapping', x);
                        return <div key={idx}>
                            <span className={styles.value}>{x.text + ' ' + x.price}</span>

                        </div>


                    }) : ''}
                </div>


                <input className={styles.create} type="button" value="Create Product" onClick={(e) => { uploadingData() }} />


            </div>

            {user.loading && <Spinner />}

        </div>
    )
}
