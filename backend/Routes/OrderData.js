import express from "express";
const router = express.Router();
import Order from '../models/Orders.js';

router.post("/orderdata", async (req,res)=>{
    let data = req.body.order_data;
    await data.splice(0,0,{Order_date: req.body.order_date});

    let eId = await Order.findOne({"email": req.body.email})

    if(eId === null){         // first ever user 
        try{
            await Order.create({
                email: req.body.email,
                order_data: [data]
            })
            .then(() => {
                res.json({success: true});
            })
        }catch(err){
            console.log("Error while adding new email to Order List OrderData.js" + err);
            res.send("Server Error in OrderData.js " + err.message);
        }
    }
    else{
        try{
            await Order.findOneAndUpdate(
                {email: req.body.email},
                {
                    $push: {order_data: data}
                }
            )
            .then(()=>{
                res.json({success: true});
            })
        }
        catch(err){
            console.log("Error in adding new order in existing one OrderData.js  "+err);
            res.send("Server Error in already existing User OrderData.js " + err.message);
        }

    }
})

router.post("/myorderdata",async (req,res) => {
    try{
        let myData = await Order.findOne({"email": req.body.email});
        res.json({orderData: myData});
    }
    catch(err){
        console.log("Trouble fetching my order OrderData.js "+ err);
    }
})

export default router;