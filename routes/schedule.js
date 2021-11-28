const express=require('express');
const Router=express.Router();
const schedule=require('../models/schedule');

Router.route('/')
.get((req,res,next)=>{
    schedule.find().then(schedule=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(schedule); 
    }).catch(err=>next(err))

})
.post((req,res,next)=>{
    schedule.create(req.body).then(schedule=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(schedule); 
    }).catch(err=>next(err))
})

.delete((req,res,next)=>{
    schedule.deleteMany().then(result=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result); 
    }).catch(err=>next(err))
})

Router.route('/:schedule_id')
.get((req,res,next)=>{
    schedule.findById(req.params.schedule_id).then(schedule=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(schedule); 
    }).catch(err=>next(err))
})
.put((req,res,next)=>{
schedule.findByIdAndUpdate(req.params.schedule_id,{$set:req.body},{new:true}).then((schedule=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(schedule); 
})).catch(err=>next(err));

})

.delete((req,res,next)=>{
schedule.findByIdAndDelete(req.params.schedule_id).then(result=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(result); 
}).catch(err=>next(err))

})

Router.route('/:schedule_id/tickets')
.get((req,res,next)=>{
    
    schedule.findById(req.params.schedule_id).then(schedule=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
       
        res.json(schedule.tickets)
    }).catch(err=>next(err))
})

.post((req,res,next)=>{
schedule.findById(req.params.schedule_id).then(schedule=>{
    schedule.tickets.push(req.body._id);
    schedule.save().then(schedule=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(schedule); 
    }).catch(err=>next(err))
}).catch(err=>next(err))
})

.delete((req,res,next)=>{
    schedule.findById(req.params.schedule_id).then(schedule=>{
        schedule.tickets=[];
        schedule.save().then(schedule=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(schedule); 
        }).catch(err=>next(err))
    }).catch(err=>next(err))
})

Router.route('/:schedule_id/tickets/ticket_id')
.delete((req,res,next)=>{
    schedule.findById(req.params.schedule_id).then(schedule=>{
        const tickets=schedule.tickets;
        var newticket=[];
       for(i=0;i<tickets.length;i++){
           if(tickets[i]!=req.params.ticket_id){
               newticket.push(tickets[i])
           }
         

       }  schedule.tickets=newticket;
       schedule.save().then(schedule=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(schedule); 
       }).catch(err=next(err))

    }).catch(err=>next(err))
})


Router.route('/search/:date')
.get((req,res,next)=>{
    schedule.find({departure_date: {$gt: req.params.date}}).then(schedule=>{
        console.log(schedule);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(schedule); 

    })
})


module.exports=Router;
