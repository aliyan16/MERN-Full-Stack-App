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
let gfs;
let storage;

const mongoURL='mongodb+srv://aliyanm12376:aliyan123@cluster0.kzpdbcw.mongodb.net/MyFB'

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const conn = mongoose.connection;
conn.once('open',()=>{
    console.log('DB Connected')
    gfs=new mongoose.mongo.GridFSBucket(conn.db,{
        bucketName:'uploads'
    })
    storage=new GridFsStorage({

        db:conn.db,
        // options:{userNewUrlParser:true,useUnifiedTopology:true},
        file:(req,file)=>{
            return {
                filename:`${Date.now()}-${file.originalname}`,
                bucketName:'uploads'
            }
        }
    })

})

 
conn.on('error',(e)=>{
    console.error('Mongodb connection error ',e)
})

const upload=multer({
    storage:(req,file,cb)=>{
        if(!storage){
            return cb(new Error('Database connection not ready'))
        }
        storage._handleFile(req,file,cb)
    }
})


app.post('/create-post',upload.single('media'),async (req,res)=>{
    try{
        if(!req.file){
            return res.status(400).json({error:'No file uploaded'})
        }

        const {username,postvalue}=req.body
        // const media=req.file?`/uploads/${req.file.filename}`:null
        const media={
            fileId:req.file.id,
            fileName:req.file.filename,
            contentType:req.file.contentType
        }

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
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({message:'Invalid file ID'})
        }
        const fileId=new mongoose.Types.ObjectId(req.params.id)
        const file=await conn.db.collection('uploads.files').findOne({_id:fileId})
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


