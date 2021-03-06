const express= require ('express');
//const router=express.Router();
const multer=require('multer');
const path=require('path');


const storage=multer.diskStorage
({
    destination:'./public/uploads',
    filename:(req,file,cb)=>{
        let ext =path.extname(file.originalname);
    cb(null,file.fieldname + '-' + Date.now() + ext);
    }
});
const imageFilter = (req,file,cb)=>{
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif|PNG|JPG|JPEG|GIF)$/)){
let err = new Error('Only image files are allowed');
err.status=400;
return cb(err, false);
    }

    cb(null, true);
}

const upload =multer({
    storage:storage,
    fileFilter: imageFilter,
    limits:{
        fileSize:1024 * 1024
    }
})

uploadRouter=express.Router();

uploadRouter.route('/')
.post(upload.single('myfile'),(req,res,next)=>{
    res.json(req.file);
});
module.exports=uploadRouter;