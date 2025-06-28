const { type } = require('@testing-library/user-event/dist/type')
const mongoose=require('mongoose')

const RegisterAccountSchema=new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    dob:{
        day:{type:Number,required:true},
        month:{type:String,required:true},
        year:{type:String,required:true},
    },
    gender:{type:String,required:true},
    emailOrMobile:{type:String,required:true,unique:true},
    password:{type:String,required:true}
},{
    timestamps:true,
}
)

module.exports=mongoose.model('RegisterAccount',RegisterAccountSchema)