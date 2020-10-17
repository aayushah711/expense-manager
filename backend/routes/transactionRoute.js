const express = require('express');
const router = express.Router();
const {
    getPaginatedTransactions,
    getTransactions,
    dashBoardTransactions,
    addTransaction,
    deleteTransaction,
    updateTransaction
} = require('../controllers/transactionController');
const Transaction = require('../models/Transaction');

const paginatedResults = (model) => {
    return async (req, res, next) => {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const type = req.query.type;
        if (type !== 'debit' && type !== 'credit') {
            const message = {
                error: true,
                message: 'Type has to be either debit or credit'
            };
            return res.status(400).json({ message });
        }
        const user_id = req.query.user_id;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results = {};

        let transactions = await model.find({ user_id, type: type || { $ne: 'all' } });
        let transactionsCount = transactions.length;

        if (endIndex < transactionsCount) {
            results.next = {
                page: page + 1,
                limit: limit
            };
        }

        if (startIndex > 0) {
            results.prev = {
                page: page - 1,
                limit: limit
            };
        }

        try {
            results.page_no = page;
            results.total_items = transactionsCount;
            results.total_pages = Math.ceil(transactionsCount / limit);
            results.current = transactions.slice(startIndex, limit);

            res.pagination = results;
            next();
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    };
};

router.get('/pagination', paginatedResults(Transaction), getPaginatedTransactions);

router.get('/', getTransactions);

router.get('/:user_id', dashBoardTransactions);

router.post('/add', addTransaction);

router.put('/update', updateTransaction);

router.delete('/delete/:id', deleteTransaction);

module.exports = router;
