const router=require("express").Router();
const User=require("../models/ser");
const CryptoJS=require("crypto");
const jwt=require("jsonwebtoken");



// Register
router.post("/register", async (req,res)=>{
    const newUser=new User({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        phone:req.body.phone,
        address:req.body.address,
        fname:req.body.fname,
        lname:req.body.lname

        // password:CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC).toString(),
    });

    try{
        const savedUser=await newUser.save();
        res.status(201).json(savedUser);
    }catch(e){
        res.status(500).json(e);
    }
    
});


//Login
// router.post("/login",async (req,res)=>{
//     try{
//         const user=await User.findOne({username:req.body.username});
//         !user && res.status(401).json("Wrong Credentials");
        
//         const hashedPassword=CryptoJS.AES.decrypt(user.password,process.env.PASS_SEC);

//         const Originalpassword=hashedPassword.toString(CryptoJS.enc.Utf8);
        
//         Originalpassword !== req.body.password && 
//           res.status(401).json("Wrong Credentials");

//           const accessToken=jwt.sign({
//             id:user._id,
//             isAdmin:user.isAdmin,
//           },process.env.JWT_SEC,{expiresIn:"3d"});

//         const { password, ...others}=user._doc;


//         res.status(200).json({...others,accessToken});


//     }catch(e){
//         res.status(500).json(e);
//     }
// });

router.post("/admin/login",async (req,res)=>{

    const{username,password}=req.body;

    if(!username || !password) return res.status(400).send("Plz add email or password")
    try{
        const check = await User.findOne({username:username})
        if(check && password===check.password && check.isAdmin)  {
            res.status(200).json(check)
        }
        else res.status(400).send("invalid username or password");

    }catch(e){
        res.status(500).send("Error while checking user")
    }
})

router.post("/login",async (req,res)=>{

    const{username,password}=req.body;

    if(!username || !password) return res.status(400).send("Plz add email or password")
    try{
        const check = await User.findOne({username:username})
        if(check && password===check.password)  {
            res.status(200).json(check)
        }
        else res.status(400).send("invalid username or password");

    }catch(e){
        res.status(500).send("Error while checking user")
    }
})     


module.exports=router;