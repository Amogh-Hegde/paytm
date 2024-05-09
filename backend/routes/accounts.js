const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../middleware');
const { Accounts,User } = require('../db');
const mongoose = require('mongoose');

router.get('/balance',authMiddleware,async(req,res) => {
    const user = await Accounts.findOne({
        userId : req.userId,
    });
    if(!user){
        return res.status(400).json({
            msg : "unauthorized access"
        })
    }
    const balance = user.balance;
    return res.json({
        balance,
    })
})

router.post('/transfer',authMiddleware,async(req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    const {amount, to } = req.body;
    const account = await Accounts.findOne({userId : req.userId}).session(session);
    const userExists = await User.findOne({_id : to,}).session(session);

    if(!userExists || !account ){
        await session.abortTransaction();
        return res.status(400).json({
            msg : "user/account doesn't exist"
        })
    }

    if(account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            msg : "insufficient balance"
        })
    }
    try {
        await Accounts.updateOne({userId : req.userId,},{$inc : {balance : -amount}}).session(session);
        await Accounts.updateOne({userId : to},{$inc : {balance : amount}}).session(session);
        await session.commitTransaction();
        return res.json({
            msg : "transaction successfully completed"
        })
        
    }catch(e){
        console.log(e);
        await session.abortTransaction();
        
    }finally{
        session.endSession();
    }
})

module.exports = router;