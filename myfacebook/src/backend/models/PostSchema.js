const mongoose=require('mongoose')

const PostSchema= new mongoose.Schema({
    username:String,
    postvalue:String,
    media:{
        data:Buffer,
        contentType:String
    }

})

module.exports=mongoose.model('Newpost',PostSchema)