const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

//middleware=//auth.verifyUser//auth.verifyAdmin
router.post('/product/insert',upload.single("pImage"),auth.verifyUser,auth.verifyAdmin, function(req, res){
    if(req.file == undefined){
        return res.status(202).json({message : "Invalid File!",success:false})
    }

    const pName = req.body.pName
    const pDesc = req.body.pDesc
    const pPrice = req.body.pPrice
    const pImage = req.file.path
    const pRating = req.body.pRating
    console.log(req.body)

    const productData = new Product({pName: pName, pDesc: pDesc, pPrice: pPrice, pImage: pImage, pRating: pRating})
    productData.save()
    .then(function(result){ 
        res.status(201).json({success: true, message : "Product has been Inserted!"})
    })
    .catch(function(e){
        res.status(500).json({error : e})
    })
 })

//updating
router.put('/product/update', upload.single('pImage'), auth.verifyUser,auth.verifyAdmin, function(req,res){
    if(req.file == undefined){
        return res.status(202).json({message : "Invalid File!",success:false})
    }

    const id = req.body.id;
    const pName = req.body.pName;
    const pDesc = req.body.pDesc;
    const pPrice = req.body.pPrice;
    const pImage = req.file.path;
    const pRating = req.body.pRating;

    Product.updateOne({_id: id},{
        pName : pName,  
        pDesc : pDesc,
        pPrice : pPrice, 
        pImage : pImage,
        pRating : pRating
    })
    .then(function(result){
        res.status(201).json({message : "Product has been updated.",success:true})            
    })
    .catch(function (e) {
        res.status(500).json({error : e})        
    });
})

//deleting
router.post('/product/delete', auth.verifyUser,auth.verifyAdmin, function(req, res){
    const id = req.body.id;
    Product.deleteOne({_id : id})
    .then(function(result){
        res.status(200).json({message: "Product has been deleted!",success:true})
    })
    .catch(function(e){
        res.status(404).json({error : e})
    })
})

// gives all products
router.get('/product/showAll', function(req,res){
    Product.find()    
    .then(function(data){        
        res.status(200).json({success: true, data: data})    
    })    
    .catch(function(e){
        res.status(500).json({error:e})    
    })
})
    
router.get('/product/single/:id', function(req,res){
    const id=req.params.id;    
    Product.findOne({_id:id})    
    .then(function(data){        
        res.status(200).json({data:data})    
    })    
    .catch(function(e){        
        res.status(500).json({error:e})    
    })
})

module.exports = router