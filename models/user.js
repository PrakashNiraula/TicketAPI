const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
        fname:{
            type:String,
            required:true
        }, lname:{
            type:String,
            required:true
        },email:{
            type:String,
           
        },phone:{
            type:String,
          
        }, username:{
            type:String,
            required:true,
            minlength:3        
        },password:{
            type:String,
            required:true
        },role:{
            type:String,
            default:'user',
            enum:['user','owner','admin']
         },vehicles:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Vehicle',
            default:null
        }],tickets:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'ticket',
            default:null
        }]
},{timestamps:true})
module.exports=mongoose.model('user',userSchema);
