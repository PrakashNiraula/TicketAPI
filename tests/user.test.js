const request=require('supertest');
const express=require('express');
const mongoose=require('mongoose');
const userRouter=require('../routes/users');
require('dotenv').config();
const jwt=require('jsonwebtoken');

const app=express();
app.use(express.json());


app.use('/users',userRouter);

beforeAll((done)=>{
    mongoose.connect(global.__MONGO_URI__,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true
    }).then(db=>{
        console.log('Connected..');
        done();
    }).catch(err=>{
        console.error(err);
        process.exit(1);
    })
})

afterAll(done=>{
    mongoose.disconnect().then(()=>{
        console.log('Disconnecting');
        done();
    })
})


describe('Test userRouter',()=>{






    test('Register User',async ()=>{
        const res = await request(app).post('/users/register').send({
            fname: 'test112233',
            lname: 'test222222',
            email: "test@test.com",
            phone: "0123456789",
            username: "test123456",
            password: "test123456",
            role: "user"
        });
        console.log(res.body);
        expect(res.statusCode).toBe(200);
        
    })




    test('Register Admin',async ()=>{
        const res = await request(app).post('/users/register').send({
            fname: 'testadmin',
            lname: 'testadmin',
            email: "testadmin@test.com",
            phone: "012153456789",
            username: "testadmin",
            password: "testadmin",
            role: "admin"
        });
        console.log(res.body);
        expect(res.statusCode).toBe(200);
        
    })




    test('Login User',async ()=>{
        const res = await request(app).post('/users/login').send({
            username: 'test123456',
            password: 'test123456'
        });
        console.log(res.body);
        expect(res.statusCode).toBe(200);
    
    })


    
    test('Login Random Unregistered User',async ()=>{
        const res = await request(app).post('/users/login').send({
            username: 'unregistereduser',
            password: 'check'
        });
        console.log(res.body);
        expect(res.statusCode).toBe(500);   
    })

    
    test('Get users',async ()=>{
        const res = await request(app).post('/users/login').send({
            username: 'testadmin',
            password: 'testadmin'
        });
        const res2 = await request(app).get('/users').set({ Authorization: res.body.token });
        expect(res2.statusCode).toBe(200);
    })


    test('Get user by ID',async ()=>{


        const res = await request(app).post('/users/login').send({
            username: 'testadmin',
            password: 'testadmin'
        });

        jwt.verify(res.body.token.split(' ')[1],process.env.JWT_SECRET,(err,payload)=>{
            if(err){
                let Err=new Error("Token validation problem");
                return next(err);
            }
            const endpoint=`/users/`+payload.id+'/';
            console.log(endpoint);
            const res2 =request(app).get(endpoint).set({ Authorization: res.body.token });
        expect(res2.statusCode).toBe(200); 
            
        })    
    })

    


    test('Delete all users',async ()=>{
        const res = await request(app).post('/users/login').send({
            username: 'testadmin',
            password: 'testadmin'
        });
        const res2 = await request(app).delete('/users').set({ Authorization: res.body.token });
        expect(res2.statusCode).toBe(200);   
    })







})
