const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const ratingSchema=new Schema({
        text:{
            type:String,
            required:true
        },author:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
},{timestamps:true});
const VehicleSchema=new Schema({
    
    vehicle_type:{
        type:String,
        required:true
    },
    vehicle_number:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:false
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },schedule:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'schedule'
    }],
    ratings:
    [ratingSchema]
},{timestamps:true})
module.exports=mongoose.model('vehicle',VehicleSchema);
