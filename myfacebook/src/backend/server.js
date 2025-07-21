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
// const { connect } = require('http2');

const bcrypt=require('bcrypt');
const RegisterAccount = require('./models/RegisterSchema');
const { error } = require('console');

const Story=require('./models/StorySchema')

const app=express()
const port=5000;

const mongoURL='mongodb+srv://aliyanm12376:aliyan123@cluster0.kzpdbcw.mongodb.net/MyFB'


app.use(bodyParser.json())
app.use(cors())

// const storage=new GridFsStorage({
//     url:mongoURL,
//     // options:{userNewUrlParser:true,useUnifiedTopology:true},
//     file:(req,file)=>{
//         return {
//             filename:`${Date.now()}-${file.originalname}`,
//             bucketName:'uploads'
//         }
//     }
// })

const upload=multer({storage:multer.memoryStorage()})

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

// let storage;




// const conn = mongoose.connection;

let gfs;

mongoose.connection.once('open',()=>{
    console.log('DB Connected')
    gfs=new mongoose.mongo.GridFSBucket(mongoose.connection.db,{
        bucketName:'uploads'
    })
})

 
mongoose.connection.on('error',(e)=>{
    console.error('Mongodb connection error ',e)
})




// app.post('/create-post', upload.single('media'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No file uploaded' });
//     }

//     const { username, postvalue } = req.body;
//     const fileName = `${Date.now()}-${req.file.originalname}`;

//     const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: 'uploads' });
//     const uploadStream = bucket.openUploadStream(fileName, {
//       contentType: req.file.mimetype
//     });

//     uploadStream.end(req.file.buffer);

//     uploadStream.on('finish', async () => {
//       // Query the file we just uploaded
//       const fileDoc = await mongoose.connection.db.collection('uploads.files').findOne({ filename: fileName });

//       if (!fileDoc) {
//         return res.status(500).json({ error: 'File saved but not found in DB' });
//       }

//       const media = {
//         fileId: fileDoc._id,
//         fileName: fileDoc.filename,
//         contentType: fileDoc.contentType
//       };

//       const newPost = new Newpost({ username, postvalue, media });
//       await newPost.save();

//       res.status(201).json({ message: 'Post created successfully' });
//     });

//     uploadStream.on('error', (err) => {
//       console.error('Error uploading file', err);
//       res.status(500).json({ error: 'Error uploading file' });
//     });

//   } catch (e) {
//     console.error('Error creating post', e);
//     res.status(500).json({ error: 'Server error' });
//   }
// });



app.post('/create-post', upload.single('media'), async (req, res) => {
    try {
        const { username, firstName, lastName, postvalue, userId } = req.body;

        const newPostData = {
            username,
            firstName,
            lastName,
            userId,
            postvalue
        };

        if (req.file) {
            const fileName = `${Date.now()}-${req.file.originalname}`;
            const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { 
                bucketName: 'uploads' 
            });
            const uploadStream = bucket.openUploadStream(fileName, { 
                contentType: req.file.mimetype 
            });

            uploadStream.end(req.file.buffer);

            uploadStream.on('finish', async () => {
                newPostData.media = {
                    fileId: uploadStream.id,
                    fileName,
                    contentType: req.file.mimetype
                };

                const newPost = new Newpost(newPostData);
                await newPost.save();
                res.status(201).json({ message: 'Post with media created successfully' });
            });
        } else {
            // No media case
            const newPost = new Newpost(newPostData);
            await newPost.save();
            res.status(201).json({ message: 'Post without media created successfully' });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Server error' });
    }
});
app.get('/get-post', async (req, res) => {
    try {
        const posts = await Newpost.find()
            .sort({ createdAt: -1 }) // Sort by creation date (newest first)
            .populate('userId', 'firstName lastName profilePic') // Include user details you might need
            .exec();
        
        // Format the response data
        const formattedPosts = posts.map(post => ({
            _id: post._id,
            username: `${post.userId?.firstName || post.firstName} ${post.userId?.lastName || post.lastName}`,
            firstName: post.userId?.firstName || post.firstName,
            lastName: post.userId?.lastName || post.lastName,
            postvalue: post.postvalue,
            media: post.media,
            profilePic: post.userId?.profilePic || null,
            createdAt: post.createdAt,
            userId: post.userId?._id || post.userId // Fallback to original userId if not populated
        }));

        res.json(formattedPosts);
        console.log('Posts retrieved successfully');
    } catch (e) {
        console.error('Error retrieving posts:', e);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/media/:id',async(req,res)=>{
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({message:'Invalid file ID'})
        }
        const fileId=new mongoose.Types.ObjectId(req.params.id)
        const file=await mongoose.connection.db.collection('uploads.files').findOne({_id:fileId})
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

app.use('/get-videos',async (req,res)=>{
  try{
    const videos=await Newpost.find({'media.contentType':{$regex:'^video'}}).sort({_id:-1})
    res.json(videos)
    console.log('Videos fetched')
  }catch(e){
    console.error('Error fetching videos ',e)
    res.status(500).json({error:'Internal server error'})
  }
})

app.use('/register',async(req,res)=>{
  try{
    const {firstName,lastName,dob,gender,emailOrMobile,password}=req.body
    const existingUser=await RegisterAccount.findOne({emailOrMobile})
    if(existingUser){
      return res.status(400).json({error:'Email or Mobile number already exists'})
    }
    const saltRounds=10
    const hashedPassword=await bcrypt.hash(password,saltRounds)
    const newUser=new RegisterAccount({firstName,lastName,dob,gender,emailOrMobile,password:hashedPassword})
    await newUser.save()
    res.status(201).json({message:'Account created successfully'})
  }catch(e){
    console.error('Error creating account ',e)
    res.status(500).json({error:'Server error'})
  }
})

app.use('/signin', async (req, res) => {
  try {
    const { emailOrMobile, password } = req.body;
    const user = await RegisterAccount.findOne({ emailOrMobile });
    
    if (!user) {
      return res.status(404).json({ error: 'Invalid email/phone' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    // Return complete user information including _id
    res.json({
      message: 'Sign in successful',
      user: {
        _id: user._id,  // This is the crucial addition
        firstName: user.firstName,
        lastName: user.lastName,
        // Include any other relevant user data
        emailOrMobile: user.emailOrMobile,
        profilePic: user.profilePic,
        coverPic: user.coverPic
      }
    });
  } catch (e) {
    console.error('Sign in error', e);
    res.status(500).json({ error: 'Server error' });
  }
});

// app.use('/get-users',async (req,res)=>{
//   try{
//     const users=await RegisterAccount.find({},'firstName lastName')
//     res.json(users)
//   }catch(e){
//     console.error('Error fetching users',e)
//     res.status(500).json({error:'Server error'})
//   }
// })

app.use('/upload-story',upload.single('media'),async(req,res)=>{
  try{
    if(!req.file){
      return res.status(400).json({error:"No file uploaded"})
    }
    const {username}=req.body
    const fileName=`${Date.now()}-${req.file.originalname}`
    const bucket=new mongoose.mongo.GridFSBucket(mongoose.connection.db,{bucketName:'uploads'})
    const uploadStream=bucket.openUploadStream(fileName,{
      contentType:req.file.mimetype
    })
    uploadStream.end(req.file.buffer)
    uploadStream.on('finish',async()=>{
      const fileDoc=await mongoose.connection.db.collection('uploads.files').findOne({filename:fileName})
      if(!fileDoc){
        return res.status(500).json({error:"File saved but not found in DB"})
      }
      const media={
        fileId:fileDoc._id,
        fileName:fileDoc.filename,
        contentType:fileDoc.contentType
      }
      const newStory=new Story({username,media})
      await newStory.save()
      res.status(201).json({message:'Story uploaded successfully'})
    })
    uploadStream.on('error',(e)=>{
      console.error('Error uploading story',e)
      res.status(500).json({error:'Error uploading story file'})
    })

  }catch(e){
    console.error('Error creating story',e)
    res.status(500).json({error:'Server error'})
  }
})

app.get('/get-stories',async(req,res)=>{
  try{
    const stories=await Story.find().sort({createdAt:-1})
    res.json(stories)
  }catch(e){
    console.error('Error fetching stories ',e)
    res.status(500).json({error:'Server error'})

  }
})
app.get('/story/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid story ID' });
    }

    const file = await mongoose.connection.db.collection('uploads.files').findOne({ _id: new mongoose.Types.ObjectId(id) });

    if (!file) {
      return res.status(404).json({ message: 'Story file not found' });
    }

    const downloadStream = gfs.openDownloadStream(file._id);
    res.set('Content-Type', file.contentType);
    downloadStream.pipe(res);
  } catch (e) {
    console.error('Error fetching story', e);
    res.status(500).send('Error fetching story');
  }
});

app.post('/update-profile-pic/:userId',upload.single('media'),async(req,res)=>{
  try{
    const {userId}=req.params
    if(!req.file) {return res.status(400).json({error:'No file uploaded'})}
    const fileName=`${Date.now()}-${req.file.originalname}`
    const bucket=new mongoose.mongo.GridFSBucket(mongoose.connection.db,{bucketName:'uploads'})
    const uploadStream=bucket.openUploadStream(fileName,{contentType:req.file.mimetype})
    uploadStream.end(req.file.buffer)
    uploadStream.on('finish',async()=>{
      await RegisterAccount.findByIdAndUpdate(userId,{
        profilePic:{
          fileId:uploadStream.id,
          fileName,
          contentType:req.file.mimetype
        }
      })
      res.json({message:'Profile picture updated'})
    })
  }catch(e){
    console.error(e)
    res.status(500).json({error:'Server error'})
  }
})

app.get('/get-user-posts/:userId',async(req,res)=>{
  try{
    const posts=await Newpost.find({userId:req.params.userId}).sort({_id:-1}).populate('userId','firstName lastName profilePic').exec()
    const formattedPosts = posts.map(post => ({
            _id: post._id,
            username: `${post.userId?.firstName || post.firstName} ${post.userId?.lastName || post.lastName}`,
            firstName: post.userId?.firstName || post.firstName,
            lastName: post.userId?.lastName || post.lastName,
            postvalue: post.postvalue,
            media: post.media,
            profilePic: post.userId?.profilePic || null,
            createdAt: post.createdAt,
            userId: post.userId?._id || post.userId // Fallback to original userId if not populated
        }));

    res.json(formattedPosts)
  }catch(e){
    console.error('Error fetching user posts ',e)
    res.status(500).json({error:'Server error'})
  }
})

app.post('/update-cover-pic/:userId',upload.single('media'),async(req,res)=>{
  try{
    const {userId}=req.params
    if (!req.file){return res.status(400).json({error:'No file uploaded'})}

    const fileName=`${Date.now()}-${req.file.originalname}`
    const bucket= new mongoose.mongo.GridFSBucket(mongoose.connection.db,{bucketName:'uploads'})
    const uploadStream=bucket.openUploadStream(fileName,{contentType:req.file.mimetype})
    uploadStream.end(req.file.buffer)
    uploadStream.on('finish',async()=>{
      await RegisterAccount.findByIdAndUpdate(userId,{
        coverPic:{
          fileId:uploadStream.id,
          fileName,
          contentType:req.file.mimetype
        }
      })
      res.json({message:' cover photo updated successfully '})
    })
  }catch(e){
    console.error(e)
    res.status(500).json({error:'Server error'})
  }
})


app.get('/get-users',async(req,res)=>{
  try{
    const users=await RegisterAccount.find({},'firstName lastName profilePic')
    res.json(users)
  }catch(e){
    console.error('Error fetching users ',e)
    res.status(500).json({error:'server error'})
  }
})

app.get('/get-user-images/:userId',async(req,res)=>{
  try{
    const images=await Newpost.find({userId:req.params.userId,'media.contentype':{$regex:'^image'}})
    res.json(images)
  }catch(e){
    console.error('error fetching user images ',e)
    res.status(500).json({error:'Server error'})
  }
})

app.get('/get-user-profile/:userId',async(req,res)=>{
  try{
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }
    const user=await RegisterAccount.findById(req.params.userId,'profilePic coverPic')
    if(!user) {return res.status(404).json({error:' User not found'})}
    res.json(user)
  }catch(e){
    console.error('Error fetching user profile ',e)
    res.status(500).json({error:"Server error"})
  }
})

app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})


