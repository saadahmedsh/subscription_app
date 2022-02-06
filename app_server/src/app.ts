import express from 'express'
import router from './routes/user'
import mongoose from 'mongoose'


const uri ='mongodb+srv://saadahmedsh:saadahmed32@subscriptionapp.cvzt1.mongodb.net/subscriptionapp?retryWrites=true&w=majority';
mongoose.connect(uri)
  .then(() => {
    console.log('MongoDB Connected…')
  })
  .catch(err => console.log(err))

const app = express();
const port = 8001;



app.use(express.json())
app.use('/user', router)


app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );