const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const routeSchema=new Schema({
      start:{
        type:String,
        required:true
        },destination:{
            type:String,
            required:true
        }
        
},{timestamps:true})
module.exports=mongoose.model('route',routeSchema);