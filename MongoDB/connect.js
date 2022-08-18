import mongoose from 'mongoose';


export const connect = () => {

  mongoose.connect(process.env.connect, (err) => {

    err ? console.log(err) : console.log('database connected sucessfully..')
  })

}