const express=require('express');
const router=express.Router();
const User=require('../models/User');
const { body, validationResult } = require('express-validator');

router.post('/',[
    body('name').isLength({min:2}),
    body('email').isEmail(),
    body('password').isLength({min:5})
],(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()});
    }
    console.log(req.body);
    const user=User(req.body);
    
    user.save(function(err){
        if(err && err.code===11000){
            console.log("Dup found!")
        }
    })


    res.send(req.body);
})

module.exports=router