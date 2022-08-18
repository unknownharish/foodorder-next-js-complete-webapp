import '../styles/globals.css'
import Layout from './Layout'

import { Provider } from 'react-redux'
import { Store } from '../REDUX/store'

function MyApp({ Component, pageProps }) {
  return (

    <Provider store={Store}>

      <Layout>
        <Component {...pageProps} />
      </Layout>

    </Provider>
  )

}

export default MyApp
