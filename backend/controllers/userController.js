const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation, userUpdationValidation } = require('./validation');

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json(err);
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.id });
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err);
    }
};

const registerUser = async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) {
        const message = {
            error: 'true',
            message: error.details[0].message
        };
        return res.status(400).json(message);
    }

    try {
        const emailExists = await User.findOne({ email: req.body.email });
        if (emailExists) {
            const message = {
                error: 'true',
                message: 'Email already exists in the database.'
            };

            return res.status(400).send(message);
        }

        const hashedPassword = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));

        const { name, email } = req.body;
        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        const savedUser = await user.save();

        const message = {
            error: 'false',
            message: 'User registered successfully!',
            user: {
                id: savedUser._id,
                name,
                email
            }
        };
        res.status(200).send(message);
    } catch (err) {
        const message = {
            error: 'true',
            message: 'Could not register user!',
            err
        };
        res.status(400).send(message);
    }
};

const loginUser = async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        const message = {
            error: 'true',
            message: 'You do not have an account with us! Please register first.'
        };
        return res.status(400).send(message);
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        const message = {
            error: 'true',
            message: 'Invalid Password'
        };
        return res.status(400).send(message);
    }

    const { name, email, _id } = user;

    const message = {
        error: 'false',
        user: {
            id: _id,
            name,
            email
        }
    };

    return res.status(200).send(message);
};

const updateUser = async (req, res) => {
    const { error } = userUpdationValidation(req.body);
    if (error) {
        const message = {
            error: 'true',
            message: error.details[0].message
        };
        return res.status(400).send(message);
    }

    let userExists = true;
    try {
        let user = await User.findOne({ _id: req.body.user_id }, (err) => {
            if (err) {
                userExists = false;
            }
        });

        const hashedPassword = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));
        const { name, email } = req.body;

        user.name = name;
        user.email = email;
        user.password = hashedPassword;

        await user.save();
        const message = {
            error: 'false',
            message: 'Updated user successfully!',
            transaction: { name, email }
        };
        res.status(200).send(message);
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
            message: 'Could not update user!'
        };
        res.status(400).send(message);
    }
};

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        const message = {
            error: 'false',
            message: 'Deletion successful!'
        };
        res.status(200).json(message);
    } catch (err) {
        const message = {
            error: 'true',
            message: 'Could not delete user!'
        };
        res.status(400).json(message);
    }
};

module.exports = { getUsers, getUser, registerUser, loginUser, updateUser, deleteUser };
