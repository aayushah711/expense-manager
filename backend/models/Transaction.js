const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
    {
        user_id: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        timestamp: {
            type: Date,
            required: true
        }
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('Transaction', transactionSchema);
