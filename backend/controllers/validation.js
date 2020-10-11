const Joi = require('joi');

const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(4).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
};

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
};

const userUpdationValidation = (data) => {
    const schema = Joi.object({
        user_id: Joi.required(),
        name: Joi.string().min(4).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
};

const transactionValidation = (data) => {
    const schema = Joi.object({
        user_id: Joi.required(),
        title: Joi.string().required(),
        type: Joi.string().required(),
        amount: Joi.number().required()
    });
    return schema.validate(data);
};

const transactionUpdationValidation = (data) => {
    const schema = Joi.object({
        transaction_id: Joi.required(),
        title: Joi.string().required(),
        type: Joi.string().required(),
        amount: Joi.number().required()
    });
    return schema.validate(data);
};

module.exports = {
    registerValidation,
    loginValidation,
    userUpdationValidation,
    transactionValidation,
    transactionUpdationValidation
};
