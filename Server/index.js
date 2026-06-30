import { dotenv } from 'dotenv';
import app from './app';
dotenv.config()
const PORT =process.env.PORT||8000
app.listen(PORT,()=>{
console(`your server is running on port ${PORT} `)
})