const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const commentSchema=new Schema({
    text:{
        type:String,
        required:true
    },author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
},{timestamps:true});
const ticketSchema = new  Schema({
    schedule_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'schedule'
    }, buyer:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    }, seat_id:[{
        type:String,
        required:true
    }], payment:{
        type:String,
        default:'Pending',
        enum:['Pending','Success']
    }, method:{
        type:String,
        default:'COD',
        enum:['COD','Esewa']
    }, comments:[commentSchema ]
},{timestamps:true})

module.exports=mongoose.model('ticket',ticketSchema);