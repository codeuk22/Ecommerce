const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const Cart=require("../models/Cart");
const router=require("express").Router();

//Create

router.post("/",verifyToken, async (req,res)=>{
    const newCart=new Cart(req.body);

    try{
        const savedProduct=await newProduct.save();
        res.status(200).json(savedProduct);
    }catch(e){
        res.status(500).json(e);
    }
})


// Update
router.put("/:id",verifyTokenAndAuthorization,async (req,res)=>{
    
    try{
        const updatedCart=await Cart.findByIdAndUpdate(req.params.id,{
            $set:req.body,
        },{new:true});
        res.status(200).json(updatedCart);
    }catch(e){
        res.status(500).json(e);
    }
})

//Delete
router.delete("/:id",verifyTokenAndAuthorization,async (req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted");
    }catch(e){
        res.status(500).json(e);
    }
})


 //Get User Cart

router.get("/find/:userId",verifyTokenAndAuthorization, async (req,res)=>{
    try{
        const cart=await Cart.findOne(req.params.id);
        res.status(200).json(cart);
    }catch(e){
        res.status(500).json(e);
    }
})

//Get All

router.get("/",verifyTokenAndAdmin,async (req,res)=>{
    try{
        const carts=await Cart.find();
        res.status(200).json(carts);
    }catch(e){
        res.status(500).json(e);
    }
})


module.exports=router;