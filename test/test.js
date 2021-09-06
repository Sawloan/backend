const Registration = require('../models/accountModule');
const Product = require('../models/productModel')
const Booking = require('../models/bookingModel')
const mongoose = require('mongoose');


const url = 'mongodb://localhost:27017/JersyNepal';

beforeAll(async()=>{
    await mongoose.connect(url,
        {
            useNewUrlParser:true,
            useCreateIndex:true
        }
    )
})

afterAll(async()=>{
    await mongoose.connection.close();
})

describe("User Testing",()=>{
    
    it("User Registration Testing",()=>{
        const user = {
            fullname: "unittest1",
            username: "unittest1",
            email: "unittest1@gmail.com",
            phone: "9845236124",
            password: "123456",
            Usertype: "Admin"
        }

        return Registration.create(user)
        .then((reg_ret)=>{
            expect(reg_ret.fullname).toEqual("unittest1")
        })
    })

    
    it("Product Addition Testing",()=>{
        const product = {
           
            pName: "test",
            pDesc: "new test",
            pPrice: 4125,
            pImage: "No-img.jpg",
            pRating: 2


        }

        return Product.create(product)
        .then((product_ret)=>{
            expect(product_ret.pName).toEqual("test")
        })
    })


    
    it("Testing Product update",async ()=>{
       const status = await Product.updateOne({_id:Object("607a887efd016e4da0958619")},{
            $set:{
                "pName":"tester"
            }
        })
     
        expect(status.ok).toBe(1)
    })

    
    it("Testing for Product Delete",async ()=>{
        const status = await Product.deleteOne({
            "_id":Object("607a887efd016e4da0958619")
        })
     expect(status.ok).toBe(1);
        
    })

    
    it("Testing for product booking",()=>{
            const booking = {
                "user_id": "603cfb1cad33df18c02a5e8c",
                "product_id": "607a887efd016e4da0958619",
                "quantity": 5,
                "price": 1205,
                "booked_At": "2021-04-13"
            
            }

            return Booking.create(booking)
            .then((booking_ret)=>{
                expect(booking_ret.quantity).toEqual(5)
            })
    })

    
    it("Testing for Booking Delete",async ()=>{
        const status = await Booking.deleteOne({
            "_id": Object("607c9c624e6a1f0d4c2d09b6")
        })
        expect(status.ok).toBe(1);
    })

   
    
    it("Testing Booking update",async ()=>{
       const status = await Booking.updateOne({_id:Object("607c9c604e6a1f0d4c2d09b5")},{
            $set:{
                "quantity":2
            }
        })
     
        expect(status.ok).toBe(1)
    })


   
    it("Testing user details update",async ()=>{
        const status = await Registration.updateOne({
            "_id":Object("603cfb1cad33df18c02a5e8c")
        },
        {
            $set:{
                "accFN":"test",
                "accUN":"tester"
            }
        })

        expect(status.ok).toBe(0)
        
    })
})