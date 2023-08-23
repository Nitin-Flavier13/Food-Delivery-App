import express from "express";
const router = express.Router();

router.post("/fooddata",(req,res)=>{
    try{
        console.log(global.food_items);
        console.log(global.foodCategory);
        res.send([global.food_items,global.foodCategory]);
    }
    catch(err){
        console.log("Error in displaying data "+err);
    }
})

export default router;