import Stripe from 'stripe';


export default async function handler(req, res) {

    let stripe = new Stripe(process.env.secret_key+'');
   

    if (req.method == 'POST') {
        console.log(process.env.secret_key);


        try {

            let { id, amount, currency, name,
                address,
                city,
                state,
                country ,postalcode} = req.body;

            amount = parseInt(amount * 100)


            const intent = await stripe.paymentIntents.create({
                amount: amount || 100,
                currency: currency || 'inr',
                payment_method: id,
                confirm: true,
                shipping: {
                    name,
                    address: {
                        line1: address,
                        postal_code: postalcode,
                        city,
                        state,
                        country

                    }

                }

            });


            res.json({
                client_secret:intent.client_secret,
                error: false,

            })


        } catch (error) {
            console.log(error)

            res.json({
                error: true
            })
        }

    }




}

