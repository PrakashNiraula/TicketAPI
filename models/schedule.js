const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const scheduleSchema=new Schema({
    vehicle_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'vehicle',
        required:true
    }, route_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'route',
        required:true
    },
    departure_date:{
        type:Date,
        required:true
    },departure_time:{
        type:String,
        required:true
    },status:{
        type:String,
        default:'LeavingOnTime',
        enum:['LeavingOnTime','Ongoing','Finished']
    },repitition:{
        type:String,
        default:'Once',
        enum:['Once','Daily','Custom']
    },tickets:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ticket'
    }]
},{timestamps:true});


module.exports=mongoose.model('schedule',scheduleSchema)