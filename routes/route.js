const express=require('express');
const router=express.Router();
const routeSchema=require('../models/route')


router.route('/')
.get((req,res,next)=>{
    routeSchema.find(req.body).then(route=>{
        res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(route); 
    }).catch(next);
})

.post((req,res,next)=>{
    routeSchema.create(req.body).then(route=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(route); 
      }) .catch(next)
})

.delete((req,res,next)=>{
    routeSchema.deleteMany().then(result=>{
       
        res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(result); }).catch(next);
})

router.route('/:route_id')
.get((req,res,next)=>{
    routeSchema.findById(req.params.route_id).then(route=>
        {
            if(!route){
               return next(new Error('Invalid route id'))
            } 
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(route); 
        })
            .catch(next);
})

.put((req,res,next)=>{
    routeSchema.findByIdAndUpdate(req.params.route_id,{$set:req.body},{new:true}).then(route=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(route); 
    }).catch(next);
})

.delete((req,res,next)=>{
    routeSchema.deleteMany().then(result=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result); 
    }).catch(next);
})


router.route('/search/:start/:destination')
.post((req,res,next)=>{
    routeSchema.find({start:req.params.start,destination:req.params.destination}).then(route=>{
       console.log(route);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(route); 
       // console.log(res.body());
    }).catch(next);

})





module.exports=router;