const jwt = require('jsonwebtoken');
const Account = require('../models/accountModule');

module.exports.verifyUser = function(req,res,next){

    try{
        const token = req.headers.authorization.split(" ")[1];
        const userData = jwt.verify(token, 'secretKey');
    
    Account.findOne({ _id : userData.userId})
    .then(function(result){
        req.result = result
        next();
    })
    .catch(function(e){
        console.log(e)
        res.status(500).json({error : e})
    })
    }
    catch(err){
        res.status(401).json({message : "auth failed"})
    }
}


//guard for admin
module.exports.verifyAdmin = function(req, res, next){
    if(!req.result){
        return res.status(401).json({message : "Unauthorized User!"})
    }
    else if(req.result.Usertype !== 'Admin'){
        return res.status(401).json({message : "Unauthorized User!"})
    }
    next()
}

//another guard for customer
module.exports.verifyCustomer = function(req, res, next){
    if(!req.UserAccount){
        return res.status(401).json({message : "Unauthorized User!"})
    }
    else if(req.UserAccount.Usertype !== 'Customer'){
        return res.status(401).json({message : "Unauthorized User!"})
    }
    next()
}