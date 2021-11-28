const validator=require('validator');



const registrationvalidation=(data)=>{

let errors={};
if(data.username){
    if(!validator.isLength(data.username.trim(),{min:6,max:30}))
    errors.username='Username must me 6 and 30 charater';
    
}else{
    errors.username='Username is required';
}


if(data.password){
if(!validator.isLength(data.password.trim(),{min:6,max:30})){
    errors.password='password must me 6 and 30 charater'
}

}
else{
    errors.password='Password is required';
}
return{
    errors,isValid:Object.keys(errors).length==0
}

}

module.exports={
registrationvalidation

}