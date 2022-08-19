import cookie from 'cookie'

export default async function handler(req, res) {




    if (req.method == 'POST') {
        const { username, password } = req.body


        if (process.env.username == username && process.env.password == password) {

            res.setHeader('Set-Cookie', cookie.serialize('token', process.env.secret, { maxAge: 60 * 60, path: '/' }))

            

            res.json({ cookie: 'set ok', error: false })
        }

        else {

            res.json({
                cookie: 'not',
                error: true
            })
        }
    }







}