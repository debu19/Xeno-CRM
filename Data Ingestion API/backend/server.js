import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import 'dotenv/config'
import customerRouter from './routes/customerRoute.js';
import orderRouter from './routes/orderRoute.js';
import communicationLogRouter from './routes/communicationLogRoute.js'

//app config
const app = express()
const port = process.env.PORT

//middleware
app.use(express.json())
app.use(cors())

//DB connection
connectDB();

//api endpoints
app.use('/api/customers',customerRouter);
app.use('/api/orders', orderRouter);
app.use('/api/send-message',communicationLogRouter)

app.get("/", (req, res) => {
    res.send("API working")
})

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
})
