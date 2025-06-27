const mongoose=require('mongoose')
const express= require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const Newpost=require('./models/PostSchema')
const multer=require('multer')
const path=require('path')
// for storing large files
const {GridFsStorage}=require('multer-gridfs-storage')
const Grid=require('gridfs-stream');
const { connect } = require('http2');

const app=express()
const port=5000;


app.use(bodyParser.json())
app.use(cors())
/// for file uploading
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// const storage=multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null, path.join(__dirname, 'uploads'))

//     },
//     filename:(req,file,cb)=>{
//         cb(null,`${Date.now()}_${file.originalname}`)
//     }
// })
// const storage=multer.memoryStorage()
// const upload=multer({storage})
////

const mongoURL='mongodb+srv://aliyanm12376:aliyan123@cluster0.kzpdbcw.mongodb.net/MyFB'

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;
let storage
const conn = mongoose.connection;
conn.once('open',()=>{
    console.log('DB Connected')
    gfs=new mongoose.mongo.GridFSBucket(conn.db,{
        bucketName:'uploads'
    })
})

 storage=new GridFsStorage({
    url:mongoURL,
    // options:{userNewUrlParser:true,useUnifiedTopology:true},
    file:(req,file)=>{
        return new Promise((resolve,reject)=>{
            const filename=`${Date.now()}-${file.originalname}`
            const fileInfo={
                filename:filename,
                bucketName:'uploads'
            }
            resolve(fileInfo)
        })
    }
})

const upload=multer({storage})


app.post('/create-post',upload.single('media'),async (req,res)=>{
    try{
        const {username,postvalue}=req.body
        // const media=req.file?`/uploads/${req.file.filename}`:null
        const media=req.file?{
            fileId:req.file.id,
            fileName:req.file.filename,
            contentType:req.file.contentType
        }:null

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

app.get('/media/:id',async(req,res)=>{
    try{
        const file=await conn.db.collection('uploads.files').findOne({
            _id:new mongoose.Types.ObjectId(req.params.id)
        })
        if(!file){
            return res.status(404).json({message:'File not found'})
        }
        const downloadStream=gfs.openDownloadStream(file._id)
        res.set('Content-Type',file.contentType)
        downloadStream.pipe(res)
    }catch(e){
        console.log('Error fetching media',e)
        res.status(500).send('Error fetching media')


    }
})



app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})


