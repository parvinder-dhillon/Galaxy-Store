import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
const generateAccessToken=asyncHandler(async(userId)=>{
    const access = jwt.sign({id:userId},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'15h'})
    return access
})
export default generateAccessToken