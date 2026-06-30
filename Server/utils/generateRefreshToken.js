import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
const generateRefreshToken =asyncHandler(async(userId)=>{
    const access = jwt.sign({id:userId},process.env.REFRESH-TOKEN-SECRET,{expiresIn:'10d'})
    return access
})
export default generateRefreshToken