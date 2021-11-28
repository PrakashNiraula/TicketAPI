const express=require('express');
var router = express.Router();
const ticket=require('../models/ticket');


router.route('/')
.get((req,res,next)=>{
    ticket.find().then((ticket)=>{  
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(ticket);  })
    .catch(next);
})

.post((req,res,next)=>{ 
    ticket.create(req.body).then((ticket)=>{ 
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(ticket); })
    .catch(next);
})

.delete((req,res,next)=>{
    ticket.deleteMany().then((result)=>{ 
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result); 
     })
    .catch(next)
})

router.route('/:ticket_id')

.get((req,res,next)=>{
    // console.log(req);
    ticket.findById(req.params.ticket_id).then((ticket)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(ticket); 
    })
    .catch(next);
})

.put((req,res,next)=>{
    ticket.findByIdAndUpdate(req.params.ticket_id,{$set:req.body},{new:true}).then((ticket)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(ticket); 
    })
    .catch(next)
})

.delete((req,res,next)=>{
    ticket.findByIdAndDelete(req.params.ticket_id).then((result)=>{  
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result); })
    .catch(next)
})



router.route('/:ticket_id/comments')
.get((req,res,next)=>{
    ticket.findById(req.params.ticket_id).then((ticket)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        
        res.json(ticket.comments);
    }).catch(next)
})

.post((req,res,next)=>{
    ticket.findById(req.params.ticket_id).then((ticket)=>{ 
        ticket.comments.push(req.body);
     ticket.save().then((ticket)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(ticket); 
     })
    }).catch(next)
})

.delete((req,res,next)=>{
    ticket.findById(teq.params.ticket_id).then((ticket)=>{
        ticket.comments=[];
        ticket.save().then((ticket)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(ticket); 
        })
    }).catch(next);
})


router.route('/:ticket_id/comments/:comment_id')
.get((req,res,next)=>{
    ticket.findById(ticket_id).then((ticket)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
       
        res.json(ticket.comment.id(req.params.comment_id));
     }).catch(next)

})
.put((req,res,next)=>{
    ticket.findById(req.params.ticket_id).then((ticket)=>{
        ticket.comment.id(req.params.comment_id).desc=req.body.desc;
        ticket.save().then((ticket)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
           
        res.json(ticket)
        })
    }) .catch(next)

})
.delete((req,res,next)=>{
    ticket.findById(req.params.ticket_id).then((ticket)=>{
        ticket.comment.id(req.params.comment_id).remove;
        ticket.save().then((result)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            
            res.json(result)})
    }).catch(next)

})

module.exports=router;