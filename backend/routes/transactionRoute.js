const express = require('express');
const router = express.Router();
const {
    getTransactions,
    addTransaction,
    deleteTransaction,
    updateTransaction
} = require('../controllers/transactionController');

router.get('/', getTransactions);

router.post('/add', addTransaction);

router.put('/update', updateTransaction);

router.delete('/delete/:id', deleteTransaction);

module.exports = router;
