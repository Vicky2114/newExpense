const express = require('express');
const {addTransaction,editTransaction,deleteTransaction, getAllTransaction } = require('../controllers/transactionController');


//router object 
const router = express.Router()


//add transaction POST method
router.post('/add-transaction',addTransaction);
router.post('/edit-transaction',editTransaction);
router.post('/delete-transaction',deleteTransaction);
//post id  transaction
router.post('/get-transaction',getAllTransaction);
module.exports = router;