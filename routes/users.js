var express = require('express');
var router = express.Router();
const User=require('../models/user');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const auth=require('../auth/auth')
const validator=require('../validation/validation');


/* GET users listing. */

router.route('/')
.get(auth.verifyUser,auth.verifyAdmin,(req, res, next)=> {
    User.find()
    .then((user)=>{
        res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(user); 
    })
    .catch(next);
 
})
.post((req,res,next)=>{
    User.create(req.body)
    .then((user)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user); 
        
    })
    .catch(next);

})
.delete(auth.verifyUser,auth.verifyAdmin,(req,res,next)=>{
    User.remove()
    .then((result)=>{
        res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(result); 
    })
.catch(next);  
})



router.route('/:user_id')
.get( (req, res, next)=> {
    User.findById(req.params.user_id)
    .then((user)=>{

        res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(user); 
    })
    .catch(next);
 
})
.put((req,res,next)=>{
    User.findByIdAndUpdate(req.params.user_id,{$set:req.body},{new:true})
    .then((user)=>{
        if(!user) return next(new Error("Invalid information"));
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user); 
    })
})
.delete((req,res,next)=>{
    User.findByIdAndRemove(req.params.user_id)
    .then((user)=>{
        res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(user); 
    })
.catch(next);  
})


router.route('/register')
.post((req,res,next)=>{
    const {errors,isValid}=validator.registrationvalidation(req.body)
    if(!isValid){
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        return res.json(errors); 
       
    }

   
    
    
    let {fname,lname,email,phone,username,password,role}=req.body;
    User.findOne({username}).then((user)=>{
        if(user){
            let err= new Error("User Exists");
            err.status=401;
            return next (err)
        }
        bcrypt.hash(password,10,(err,hashed)=>{
            if(err) next(err);
            User.create({fname,lname,username,password:hashed,email,phone,role}).then((user)=>{
                res.status= 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user); 
            })
            .catch(next)
        })
      
    }).catch(next);

    
})



router.route('/login')
.post((req,res,next)=>{
    let {username,password}=req.body;
    User.findOne({username}).then((user)=>{
        if(!user){
            let err=new Error("Invalid credentials");
            
            return next(err);
        }

        //res.json(user);
                bcrypt.compare(password,user.password,(err,result)=>{
                    if(err){
                        return next(err);
                    } 
                    if(result==false){
                           let error=new Error("Invalid credentials");
                        return next(error); 
                    }
                    let payload={
                        id:user.id,
                        username:user.username,
                        firstname:user.firstname,
                        role:user.role
                    }
                    jwt.sign(payload,process.env.JWT_SECRET,(err,result)=>{
                        if(err) return next(err);
                      res.json({
                          status:"Login successful",
                          token:`Bearer ${result}`
                      }).status(200);
                        })
                   })
    }).catch(next)
})


router.route('/:userid/tickets')
.get((req,res,next)=>{
    User.findById(req.params.userid).then(user=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user.tickets)
    }).catch(err=>next(err))
})

.post((req,res,next)=>{
User.findById(req.params.userid).then(user=>{
    user.tickets.push(req.body._id);
    user.save().then(user=>{
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user); 
    }).catch(err=>next(err))
}).catch(err=>next(err))
})

.delete((req,res,next)=>{
    User.findById(req.params.userid).then(user=>{
        user.tickets=[];
        user.save().then(user=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user); 
        }).catch(err=>next(err))
    }).catch(err=>next(err))
})



router.route('/:userid/vehicles')
.get((req,res,next)=>{
    User.findById(req.params.userid).then(user=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user.vehicles)
    }).catch(err=>next(err))
})

.post((req,res,next)=>{
User.findById(req.params.userid).then(user=>{
    user.vehicles.push(req.body._id);
    user.save().then(user=>{
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user); 
    }).catch(err=>next(err))
}).catch(err=>next(err))
})

.delete((req,res,next)=>{
    User.findById(req.params.userid).then(user=>{
        user.vehicles=[];
        user.save().then(user=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user); 
        }).catch(err=>next(err))
    }).catch(err=>next(err))
})





module.exports = router;
