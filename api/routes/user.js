const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const User = require("../models/ser");
const router = require("express").Router();


//Update
router.put("/:id", async (req, res) => {
    // if (req.body.password) {
    //     req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
    // }

    try {
        const updateUser = await User.findByIdAndUpdate({_id:req.params.id}, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updateUser);
    } catch (e) {
        res.status(500).json(e);
    }
})

//Delete

router.delete("/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted");
    } catch (e) {
        res.status(500).json(e);
    }
})

//Get User

router.get("/find/:id", async (req, res) => {
    try {
        const user = await User.findOne({_id:req.params.id});
        // const { password, ...others } = user._doc;
        // res.status(200).json(others);
        res.status(200).send(user);
    } catch (e) {
        res.status(500).json(e);
    }
})

//Get all users

router.get("/", async (req, res) => {
    // const query = req.query.new
    // try {
    //     const users = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find();
    //     res.status(200).json(users);
    // } catch (e) {
    //     res.status(500).json(e);
    // }
    // console.log("hii");

    try{
        const users=await User.find();
        // res.status(200).json(users)
        res.status(200).send(users);
    }catch(e){
        res.status(500).send(e);
    }
});

//Get user stats

router.get("/stats", async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                }
            }
        ]);
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json(e);
    }
})

// router.post("/addUser", async (req, res) => {
//     // const pp = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
//     try {
//         await User.create({
//             username: req.body.username,
//             email: req.body.email,
//             password: req.body.password,
//         }).then(() => {
//             res.status(201).send("User Added Successfully");
//         }).catch((e) => {
//             res.status(400).send("Bad Request");
//         })
//     } catch (e) {
//         res.status(500).send("error while adding data");
//     }
// })

module.exports = router;