const express=require('express')
const app=express()
const jwt=require('jsonwebtoken')
const secret='secretKey';

let verifyToken=(req,res,next)=>{
let bearerToken=req.headers.auth
let bearer=bearerToken.split(" ")
let token=bearer[1]
if(token){
    req.token=token;
}else{
    res.json({
        message:"token error"
    })
}

next()
}

app.post('/login',(req,res)=>{
    const user={
        mobile:"9789789789",
        password:"kkoko"
    }
    jwt.sign({user},secret,{expiresIn:"300s"},(err,token)=>{
        if(err){
            res.json({
                message:"Error"
            })
        }else{
            res.json({
                status:200,
                token:token,
                data:user
            })
        }
    })
})

app.get('/data',verifyToken,(req,res)=>{
jwt.verify(req.token,secret,(err,token)=>{
    if(err){
        res.json({
            message:"invalid token",
        })
    }
    res.json({
        message:"valid token",
        data:[]
    })
})
})






app.listen(5000,()=>{
    console.log('server is running on port 5000')
})