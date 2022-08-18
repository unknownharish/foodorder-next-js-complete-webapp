import Header from '/components/Header'
import Footer from '/components/Footer'
import Spinner from '../components/Spinner'
import { useSelector } from 'react-redux'

export default function Layout({ children }) {

    let user = useSelector(x => x.user)
    return (
        <div>
            <Header />
            { user.loading?  <Spinner/>:''}
             {/* <Spinner /> */}
            {children}
            <Footer />
        </div>
    )
}
