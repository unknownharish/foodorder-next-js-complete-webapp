import { product } from '../../../MongoDB/modals/product'
import { connect } from '../../../MongoDB/connect';


export default async function handler(req, res) {

    await connect()

    try {
        if (req.method == 'GET') {
            // console.log('from api', req.query)
            // console.log('from api', req.method)

            let data = await product.findById({ _id: req.query._id });
            if (!data) {

                res.status(200).json({
                    data: 'no data found',
                    error: true
                })
            }
            else {

                res.status(200).json(data)
            }
        }

    } catch (error) {

        res.json({ 'error': true })
    }



}