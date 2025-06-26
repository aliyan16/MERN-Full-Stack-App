const mongoose=require('mongoose')
const express= require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const Newpost=require('./models/PostSchema')
const multer=require('multer')
const path=require('path')

const app=express()
const port=5000;


app.use(bodyParser.json())
app.use(cors())
/// for file uploading
app.use('/uploads',express.static('uploads'))
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}_${file.originalname}`)
    }
})
const upload=multer({storage})
////


mongoose.connect('mongodb+srv://aliyanm12376:aliyan123@cluster0.kzpdbcw.mongodb.net/MyFB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/create-post',upload.single('media'),async (req,res)=>{
    try{
        const {username,postvalue}=req.body
        const media=req.file?`/uploads/${req.file.filename}`:null

        const newPost=new Newpost({username,postvalue,media})
        await newPost.save()
        res.status(201).json({message:'Post created successfully'})
    }catch(e){
        console.log('Error creating post ', e)
        res.status(500).json({error:'Server error'})
    }
})

app.get('/get-post',async(req,res)=>{
    try{
        const posts=await Newpost.find().sort({_id:-1})
        res.json(posts)
        console.log('posts retrieved')
    }catch(e){
        console.error('Error ',e)
        res.status(500).json({error:'Internal server error'})

    }
})



app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})


