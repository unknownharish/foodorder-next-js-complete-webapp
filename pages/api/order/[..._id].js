import { order } from '../../../MongoDB/modals/order'


export default async function handler(req, res) {


    if (req.method == 'GET') {
        try {

            let { _id } = req.query;

            let arr = [..._id];
            // console.log(arr[0])
            let data = await order.findById(arr[0])

            res.json({
                data,
                error: false

            })

        } catch (error) {
            console.log(error)
            res.json({
                error: true
            })
        }

    }


    else if (req.method == 'PUT') {


        try {

            let { _id } = req.query;

            let data = await order.findByIdAndUpdate(_id, req.body, { new: true })
            // let body = req.body
            res.json({
                data,
                error: false,
                method: 'put',
                _id

            })

        } catch (error) {
            console.log(error)
            res.json({
                error: true
            })
        }




    }
    // else if (req.method == 'DELETE') {


    //     try {

    //         let { _id } = req.query;

    //         let data = await order.findByIdAndDelete(_id, req.body, (err, x) => {
    //             res.json({
    //                 x,
    //                 error: false,


    //             })
    //         })
    //         // let body = req.body


    //     } catch (error) {
    //         console.log(error)
    //         res.json({
    //             error: true
    //         })
    //     }




    // }
    else {
        res.json({
            error: true,
        })
    }
}


