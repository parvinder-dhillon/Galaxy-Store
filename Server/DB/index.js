import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()
if (!process.env.MONGODB-URI) {
    throw new Error(
        "please provide MONGODB-URI in env file"
    )
}
const connectDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB-URI)
        console.log(`\n Mongodb Connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB CONNECTION ERROR!",error);
        process.exit(1)
    }
}
export default connectDB
