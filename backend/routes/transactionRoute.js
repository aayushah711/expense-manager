const express = require('express');
const router = express.Router();
const {
    getTransactions,
    getTransaction,
    addTransaction,
    deleteTransaction,
    updateTransaction
} = require('../controllers/transactionController');

router.get('/', getTransactions);

router.get('/:user_id', getTransaction);

router.post('/add', addTransaction);

router.put('/update', updateTransaction);

router.delete('/delete/:id', deleteTransaction);

module.exports = router;
