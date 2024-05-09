const express = require('express')
const zod = require("zod");
const { User, Accounts } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require('../middleware');
const router = express.Router();


const signupBody = zod.object({
    username: zod.string(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string().min(6)
})

const updateBody = zod.object({
    password : zod.string().min(8).optional(),
    firstName : zod.string().max(50).optional(),
    lastName : zod.string().max(50).optional()
})


router.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id;
    const assignBalance = await Accounts.create({
        userId,
        balance : (1+Math.random())*10000,
    })
    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    return res.json({
        message: "User created successfully",
        token: token
    })
})



router.post('/signin',async (req,res)=>{
    const user = await User.findOne({
        username : req.body.username,
        password : req.body.password
    });
    if(!user){
        return res.status(411).json({
            msg : "wrong username or password"
        })
    }
    const userId = user._id;
    const token = jwt.sign({
        userId : userId,
    },JWT_SECRET);
    return res.json({
        token,
    })
})

router.put('/',authMiddleware,async (req,res)=>{
    const {success} = updateBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            msg : "wrong inputs"
        })
    }

    try {
        await User.update({
            _id : req.userId,
        },req.body)
        return res.json({
            msg : "updated successfully"
        })
    }catch(e){
        return res.status(511).json({
            msg : "error occured while updating information"
        })
    }
    
})

router.get('/bulk',authMiddleware,async(req,res)=>{
    const filter = req.query.filter;
    try{
        const users = await User.find({username : {$regex : new RegExp(filter,"i")}},'-password');
        res.json({
            users,
        })
    }catch(e){
        res.status(500).json({
            msg : e,
        })
    }
    
    
})

module.exports = router;

