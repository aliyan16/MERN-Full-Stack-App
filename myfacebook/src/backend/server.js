const mongoose=require('mongoose')
const express= require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const Newpost=require('./models/PostSchema')

const app=express()
const port=5000;


app.use(bodyParser.json())
app.use(cors())


mongoose.connect('mongodb+srv://aliyanm12376:aliyan123@cluster0.kzpdbcw.mongodb.net/MyFB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/create-post',async (req,res)=>{
    try{
        const {username,postvalue}=req.body
        const newPost=new Newpost({username,postvalue})
        await newPost.save()
        res.status(201).json({message:'Post created successfully'})
    }catch(e){
        console.log('Error creating post ', e)
        res.status(500).json({error:'Server error'})
    }
})




app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})


