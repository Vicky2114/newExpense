
const transactionModel = require('../models/transactionModel');
const moment = require('moment');

const getAllTransaction = async (req, res) => {
  try {
    const { frequency, startDate, endDate ,type} = req.body;

    const transaction = await transactionModel.find({
      ...(frequency !== 'custom'
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), 'd').toDate(),
            },
          }
        : {
            date: {
              $gte: moment(startDate).toDate(),
              $lte: moment(endDate).toDate(),
            },
          }),

      userid: req.body.userid,

      ...(type !== 'all' && {type}),
    });

    res.status(200).json(transaction);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const addTransaction = async (req, res) => {
  try {
    const newTransaction = new transactionModel(req.body);
    const createdTransaction = await newTransaction.save();
   res.status(201).json(createdTransaction);
    // res.status(201).send('Transaction Created');
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const editTransaction = async (req,res) => {
  try {
    const { userId, updatedProfile } = req.body;

    // Find the user by ID and update the profile
    const updatedUser = await userModel.findByIdAndUpdate(userId, updatedProfile, { new: true });

    res.status(201).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

};
const deleteTransaction = async (req,res) => {
  try {
    
    await transactionModel.findByIdAndDelete
    ({_id:req.body.transactionId});
    res.status(200).send('Transaction Deleted Successfully');
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { getAllTransaction, addTransaction,editTransaction,deleteTransaction };
