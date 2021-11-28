const express=require('express');
const router=express.Router();
const vehicleSchema=require('../models/vehicle');
const auth=require('../auth/auth');




router.route('/featured')
.get((req,res,next)=>{
    vehicleSchema.find().then((vehicle)=>res.json(vehicle)).catch(err=>next(err));
})


router.route('/')
.get((req,res,next)=>{
    vehicleSchema.find({owner:req.user.id}).then((vehicle)=>res.json(vehicle)).catch(err=>next(err));
})

.post((req,res,next)=>{
    if(!req.body) return next({
        "status":"Error",
        "text":"No data to save"
        });
    vehicleSchema.create(req.body).then(vehicle=>{ res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(vehicle); }).catch(err=>next(err));
})

.delete(auth.verifyAdmin,(req,res,next)=>{
    vehicleSchema.deleteMany().then(result=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result); 
    }).catch(err=>next(err));
});


router.route('/:vehicle_id')
.get((req,res,next)=>{
    vehicleSchema.findById(req.params.vehicle_id).then(vehicle=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(vehicle); 
    }).catch(err=>next(err));
})

.put((req,res,next)=>{
    vehicleSchema.findByIdAndUpdate(req.params.vehicle_id,{$set:req.body},{new:true}).then(vehicle=>{
      
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(vehicle); 

    }).catch(err=>next(err));
})

.delete((req,res,next)=>{
    vehicleSchema.findByIdAndRemove(req.params.vehicle_id).then(result=>{
    res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result); }).catch(err=>next(err));
})

router.route('/:vehicle_id/rating')
.get((req,res,next)=>{
    vehicleSchema.findById(req.params.vehicle_id).then(vehicle=>{
      
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(vehicle.ratings); }).catch(err=>next(err));
})

.post((req,res,next)=>{
    vehicleSchema.findById(req.params.vehicle_id).then(vehicle=>{
       
        vehicle.ratings.push(req.body);
        vehicle.save().then(vehicle=>{
              res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(vehicle); }).catch(err=>next(err));
    }).catch(err=>next(err));
})

.delete((req,res,next)=>{
    vehicleSchema.findById(req.params.vehicle_id).then((vehicle)=>{
          vehicle.ratings=[];
        vehicle.save().then(result=>{
             res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(result); }).catch(err=>next(err));
    }).catch(err=>next(err));
});


router.route('/:vehicle_id/rating/:rating_id')
.get((req,res,next)=>{
    vehicleSchema.findById(req.params.vehicle_id).then(vehicle=>{
         res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(ratingdata); }).catch(err=>next(err));
})

.put((req,res,next)=>{
    vehicleSchema.findById(req.params.vehicle_id).then(vehicle=>{
           vehicle.ratings.id(req.params.rating_id).text=req.body.text;
        vehicle.save().then(vehicle=>{
             res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(vehicle); }).catch(err=>next(err));
    }).catch(err=>next(err));
})

.delete((req,res,next)=>{
    vehicleSchema.findById(req.params.vehicle_id).then(vehicle=>{
          vehicle.ratings.id(req.params.rating_id).remove;
        vehicle.save().then(vehicle=>{
               res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(vehicle); }).catch(err=>next(err))
          }).catch(err=>next(err));
});



router.route('/:vehicle_id/schedule')
.get((req,res,next)=>{
    vehicleSchema.findById(req.params.vehicle_id).then(vehicle=>{
           res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(vehicle.schedule); }).catch(err=>next(err));
})

.post((req,res,next)=>{
    vehicleSchema.findById(req.params.vehicle_id).then(vehicle=>{
           vehicle.schedule.push(req.body._id);
        vehicle.save().then(vehicle=>{
              res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(vehicle); }).catch(err=>next(err));
    }).catch(err=>next(err));
})

.delete((req,res,next)=>{
    vehicleSchema.findById(req.params.vehicle_id).then((vehicle)=>{
        vehicle.schedule=[];
        vehicle.save().then(result=>{
              res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(result); }).catch(err=>next(err));
    }).catch(err=>next(err));
});


router.route('/:vehicle_id/schedule/:schedule_id')

.delete((req,res,next)=>{
    vehicleSchema.findById(req.params.vehicle_id).then(vehicle=>{
         const Schedule=vehicle.schedule;
        var newSchedule=[];
        for(i=0;i<Schedule.length;i++){
            if(Schedule[i]!=req.params.schedule_id){
                newSchedule.push(Schedule[i]);
            }
        } vehicleSchema.schedule=newSchedule;
        vehicleSchema.save().then(vehicle=>{
             res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(vehicle); }).catch(err=>next(err));

    }).catch(err=>next(err))
})

module.exports=router;
