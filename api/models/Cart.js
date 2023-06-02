const mongoose=require("mongoose");

// const CartSchema=new mongoose.Schema({
//     userId:{
//         type:String,
//         required:true
//     },
//     products:[
//         {
//             productId:{
//                 type:String
//             },
//             quantity:{
//                 type:Number,
//                 default:1
//             }
//         }
//     ]
// },{timestamps:true});

// module.exports=mongoose.model("Cart",CartSchema);





const CartSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    productId:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        default:1
    },
    size:{
        type:String
    }, 
    pricePerItem:{
        type:Number
    }
},{timestamps:true});

module.exports=mongoose.model("Cart",CartSchema);