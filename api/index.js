const express=require("express");
const app=express();
const dotenv=require("dotenv");
const userRoute=require("./routes/user");
const authRoute=require("./routes/auth");
const productRoute=require("./routes/product");
const cartRoute=require("./routes/cart");
const orderRoute=require("./routes/order");
const stripeRoute=require("./routes/stripe");
const cors=require("cors");

dotenv.config();

const port=process.env.PORT || 5000;

const mongoose=require("mongoose");

mongoose.connect(process.env.MONGO_URL,
{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("db connected");
}).catch((e)=>{
    console.log("no db connected");
});

app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/products",productRoute);
app.use("/api/carts",cartRoute);
app.use("/api/orders",orderRoute);
app.use("/api/checkout",stripeRoute);

app.all('*', (req, _) => console.log(req.path))


app.listen(port,()=>{
    console.log("server connected", port);
})