import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import connectDB from './Controllers/connect.js'
import cookieParser from 'cookie-parser'
import { staticRouter } from './Routes/staticRoute.js';
import { urlRouter } from './Routes/url-Shortener.js';
import { userRouter } from './Routes/user.js';

const app = express()
dotenv.config()

connectDB()

// If deployed behind a reverse proxy/load balancer, trust proxy must be enabled
// so req.ip is correct (required for accurate rate limiting).
// if (process.env.TRUST_PROXY === 'true') {
//     app.set('trust proxy', 1)
// }

app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'Views'))
app.use(express.json()); //For JSON Data Parsing from HTTP Request Body
app.use(express.urlencoded({extended : false}));//For Form Data Parsing from 
app.use(cookieParser()); //third party middle ware to access the cookie from the header of the HTTP request.
app.use('/', express.static(path.join(path.resolve(), 'Views')))

app.use('/', staticRouter)
app.use('/user', userRouter)
app.use('/url', urlRouter)


const PORT = process.env.PORT || 5000

app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`)
})
