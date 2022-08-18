import { connect } from '../../../MongoDB/connect'
import { product } from '../../../MongoDB/modals/product'

export default async function handler(req, res) {

    connect()

    try {


        if (req.method == 'POST') {

            let { name, desc, img, price, extras } = req.body;


            let data = new product({ name, desc, img, price, extras })
            await data.save()

            res.json({ data, error: false })
        }
        else if (req.method == 'GET') {
            let data = await product.find();

            if (!data) {

                res.json({ error: true })
            } else {

                res.json({ data })
            }
        }

        else {

            res.json({ error: true })
        }

    } catch (error) {
        console.log(error)
        res.json({ error: 'in user credentials' })
    }


}
