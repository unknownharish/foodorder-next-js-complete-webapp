import { order } from '../../../MongoDB/modals/order'




export default async function handler(req, res) {


    //  connect()

    if (req.method == 'POST') {

        try {
            let { customer, address, total, status, paymentMethod } = req.body;

            let ORDER = new order({ customer, address, total, status, paymentMethod });

            let response = await ORDER.save();

            res.json({
                error: false,
                response
            })

        } catch (error) {

            res.json({
                error: true,
            })


        }

    }

    else if (req.method == 'GET') {
        try {
            let ORDER = await order.find();
            res.json({
                'order': ORDER
            })
        } catch (error) {
            res.json({
                error: true
            })
        }
    }
    else if (req.method == 'DELETE') {
        try {
            // let ORDER = await order.findByIdAndDelete(req.body._id,);
            let ORDER = await order.deleteOne({ _id: req.body['_id'] });

            res.json({
                'order': ORDER
            })
        } catch (error) {
            res.json({
                error: true
            })
        }
    }
    else {

        res.json({
            error: true,
            status: 'invalid request'
        })
    }






}