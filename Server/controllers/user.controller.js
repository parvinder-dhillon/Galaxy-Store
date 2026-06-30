import asyncHandler from 'express-async-handler'
import { apiError } from '../utils/apiError'
import { User } from '../models/user.model'
import { apiResponse } from '../utils/apiResponse'
import bcrypt from 'bcryptjs'
import generateAccessToken from '../utils/generateAccess'
import generateRefreshToken from '../utils/generateRefreshToken'
const registerController = asyncHandler(async(req,res)=>{
    const {name,email,password,confirmPassword,mobile}= req.body||{}
    if (!name||!email||!password||!mobile||!confirmPassword) {
        throw new apiError(400,{},"All fields are required")
    }
    if(password !== confirmPassword){
        throw new apiError(400,{},"password and confirmPassword must be same")
    }
    const user =await User.findOne({email})
    if(user){
        throw new apiError(409,{},"user existed already")
    }
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password,salt)
    const payload ={
        name,
        email,
        password:hashPassword,
        mobile
    }
    const newUser = await User(payload)
    const save = await newUser.save()
    return res.json(new apiResponse(201,save,"user created succesfully"))
    })

    const loginController = asyncHandler(async(req,res)=>{
        const {email,password}=req.body
        if (!email||!password) {
            throw new apiError(400,{},"all fields are required")
        }
        const user = await User.findOne({email})
        if(!user){
            throw new apiError(404,{},"user not found")
        }
        const checkPassword = await bcrypt.compare(password,user.password)
        if(!checkPassword){
            throw new apiError(401, {}, "Invalid credentials")
        }
        const accessToken = await generateAccessToken(user._id)
        const refreshToken = await generateRefreshToken(user._id)
        const options={
            httpOnly:true,
            secure:false,
            sameSite: "lax"
        }
        user.refresh_token = refreshToken
        await user.save({ validateBeforeSave: false })
        const loggedInUser = await User.findById(user._id).select("-password -refresh_token")
        return res 
        .status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",refreshToken,options)
        .json(
            new apiResponse(200,loggedInUser,"user logged in successfully")
        )
    })
    const logoutController = asyncHandler(async(req,res)=>{
        const userId = req.userId
        const options={
            httpOnly:true,
            secure:false,
            sameSite: "lax"
        }
        res.clearCookie("accessToken", options)
        res.clearCookie("refreshToken", options)
        await User.findByIdAndUpdate(userId,{
            refresh_token:''
        })
        return res.json(
            new apiResponse(200,{}, "Logout seccessfully")
        )
    })
