const express = require('express');
const router = express.Router();
const nodemon = require('nodemon');
const ClientAccount = require('../models/accountModule');
const bcryptjs = require('bcryptjs');
const { get } = require('mongoose');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
//const test = require('../middleware/test');

router.post('/account/insert',
 [
    check('username', "Username is required!!").not().isEmpty(),
    check('email', "Email is required!!").not().isEmpty(),
    check('email', "Invalid Email!!").isEmail(),
    check('phone', "Phonenumber is required!!").isMobilePhone(),
    check('password', "Password is required!!").not().isEmpty()
],
 function(req,res){
    const errors = validationResult(req);

    if (errors.isEmpty()){
    const fullname = req.body.fullname
    const username = req.body.username
    const email = req.body.email
    const phone = req.body.phone
    const password = req.body.password
    const Usertype = req.body.Usertype
    
    

    bcryptjs.hash(password,10,function(err, hash){
        

        const data = new ClientAccount({fullname:fullname,
            username:username,email:email,phone:phone,
               password:hash,Usertype:Usertype})
       data.save()
       .then(function(result){
           //sucess message with status code
           res.status(200).json({
               success:true,
               message : "User is Registered!!",
               data:data})
               console.log(data._id)
               
       })
       .catch(function(error){
           res.status(500).json({success:false,message : err})
       })
    })

    }

    else{
        //invalid data from client
        res.status(400).json(errors.array());
    }
  
})

//Creating the login system
router.post('/account/login', function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    console.log(username);
    console.log(password);
    ClientAccount.findOne({username : username})
    .then(function(clientData){
        if(clientData===null){
            //Username not found...
            return res.status(202).json({success:false,message : "Invalid credentials!!"})
        }

        //Now compare the password
        bcryptjs.compare(password,clientData.password,function(err,result){
            if(result===false){
                //username matched but password not matched
                return res.status(202).json({success:false,message : "Invalid credentials!!"})
            }
            // Now lets generate token
            const token = jwt.sign({userId : clientData._id},'secretKey');
            res.status(200).json({success:true,token : token, message : "Authorization is Succesfull!!",data:clientData})
            console.log("true")
        })
    
    })
    .catch(function(e){
        res.status(500).json({error:e})
    })
})

// router.get('/test',test,function(req,res){
//     console.log("this is test required!!")
// })

router.put('/user/photo/:id',function(req,res){
    const id = req.params.id
    const file = req.files.file
    console.log(file)
    file.mv(`images/${file.name}`, async (err) => {
        if (err) {
          console.log(err);
          
        }
      });
      ClientAccount.findByIdAndUpdate({_id:id},
        {
            Image:file.name
        }).then(function(done){
            res.status(200).json({message:"Updated",success:true})
        })
      
})
module.exports = router;         