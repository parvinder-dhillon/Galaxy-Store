import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import { User } from '../models/user.model'
import { apiError } from '../utils/apiError'
 const auth = asyncHandler(async(req,res)=>{
    const token =req.cookies?.accessToken
    if(!token){
        throw new apiError(401,"provide token")
    }
    const decodeToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

    const user = await User.findById(decodeToken?._id).select("-password -refresh_token")
    if(!user){
        throw new apiError(401,"invalid access token")
    }
    req.userId=user._id;
    next()
})
export default auth