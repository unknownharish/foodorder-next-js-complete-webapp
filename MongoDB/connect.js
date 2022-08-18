import mongoose from 'mongoose';


export const connect = () => {

  mongoose.connect(process.env.URL, (err) => {

    err ? console.log(err) : console.log('database connected sucessfully..')
  })

}