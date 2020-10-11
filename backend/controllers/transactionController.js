const User = require('../models/User');
const Transaction = require('../models/Transaction');
const { transactionValidation, transactionUpdationValidation } = require('./validation');

const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.status(200).json(transactions);
    } catch (err) {
        res.status(400).json(err);
    }
};

const addTransaction = async (req, res) => {
    const { error } = transactionValidation(req.body);
    if (error) {
        const message = {
            error: 'true',
            message: error.details[0].message
        };

        return res.status(400).send(message);
    }

    let userExists = true;
    try {
        await User.findOne({ _id: req.body.user_id }, (err) => {
            if (err) {
                userExists = false;
            }
        });

        const { user_id, title, type, amount } = req.body;
        if (type === 'credit' || type === 'debit') {
            let timestamp = Date.now();
            const transaction = new Transaction({
                user_id,
                title,
                type,
                amount,
                timestamp
            });

            const savedTransaction = await transaction.save();
            const message = {
                error: 'false',
                message: 'Transaction created successfully!',
                transaction: savedTransaction
            };
            res.status(200).send(message);
        } else {
            const message = {
                error: 'true',
                message: 'Type of transaction not recognised.'
            };
            return res.status(400).send(message);
        }
    } catch (err) {
        if (!userExists) {
            const message = {
                error: 'true',
                message: 'No such user_id ' + req.body.user_id
            };

            return res.status(400).send(message);
        }
        const message = {
            error: 'true',
            message: 'Could not create transaction!',
            transaction: err
        };
        res.status(400).send(message);
    }
};

const updateTransaction = async (req, res) => {
    const { error } = transactionUpdationValidation(req.body);
    if (error) {
        const message = {
            error: 'true',
            message: error.details[0].message
        };

        return res.status(400).send(message);
    }

    try {
        const transactionExists = await Transaction.findOne({ _id: req.body.transaction_id });
        if (!transactionExists) {
            const message = {
                error: 'true',
                message: 'No such transaction_id ' + req.body.transaction_id
            };

            return res.status(400).send(message);
        }

        const { title, type, amount } = req.body;
        if (type === 'credit' || type === 'debit') {
            let transaction = transactionExists;
            transaction.title = title;
            transaction.type = type;
            transaction.amount = amount;
            transaction.timestamp = Date.now();
            const savedTransaction = await transaction.save();

            const message = {
                error: 'false',
                message: 'Transaction updated successfully!',
                transaction: savedTransaction
            };
            res.status(200).send(message);
        } else {
            const message = {
                error: 'true',
                message: 'Type of transaction not recognised.'
            };
            return res.status(400).send(message);
        }
    } catch (err) {
        const message = {
            error: 'true',
            message: 'Could not update transaction!',
            transaction: err
        };
        res.status(400).send(message);
    }
};

const deleteTransaction = async (req, res) => {
    try {
        await Transaction.findByIdAndDelete(req.params.id);
        const message = {
            error: 'false',
            message: 'Transaction deleted!'
        };
        res.status(200).json(message);
    } catch (err) {
        const message = {
            error: 'true',
            message: 'Could not delete transaction!'
        };
        res.status(400).json(message);
    }
};

module.exports = { getTransactions, addTransaction, deleteTransaction, updateTransaction };
