import cookieParser from 'cookie-parser';
import express from 'express';
import errorHandler from './middlewares/error.middleware';
const app = express()


app.use(cors({
    origin:process.env.FRONTEND-URL,
    Credentials:true,
}))

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.get('/',(req,res)=>{
    res.send("backend is running")
});
app.use("/api/users")
app.use(errorHandler())
export default app