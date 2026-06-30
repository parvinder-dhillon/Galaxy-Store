import mongoose,{mongo, Schema} from "mongoose";

const userModel = new Schema({
    name:{
        type:String,
        required:[true,"name is required"]
    },
    email:{
        type:String,
        required:[true,"email is required"]
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    mobile:{
        type:String,
        default:null
    },
    refresh_token:{
        type:String,
        default:""
    },
    verify_email:{
        type:Boolean,
        default:false
    },
    last_login_date:{
        type:Date,
        default:""
    },
    status:{
        type:String,
        enum:["Active","Inactive","Suspended"],
        default:"Active"
    },
    address_details:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'Address'
        }
    ],
    shopping_cart:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'CartProduct'
        }
    ],
    orderHistory:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'Order'
        }
    ],
    forgot_password_otp:{
        type:String,
        default:null
    },
    forgot_password_expiry:{
        type:Date,
        default:""
    },
    role:{
        type:String,
        enum:["ADMIN","USER"],
        default:"USER"
    }

},{timestamps:true})

export const User = mongoose.model('User',userModel)