const mongoose=require('mongoose')

const PostSchema= new mongoose.Schema({
    username:String,
    postvalue:String,
    media:{
        fileId:mongoose.Schema.Types.ObjectId,
        fileName:String,
        contentType:String
    }

})

module.exports=mongoose.model('Newpost',PostSchema)