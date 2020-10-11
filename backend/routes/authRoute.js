const express = require('express');
const router = express.Router();
const { getUsers, getUser, registerUser, loginUser, updateUser, deleteUser } = require('../controllers/userController');

router.get('/', getUsers);

router.get('/:id', getUser);

router.post('/register', registerUser);

router.post('/login', loginUser);

router.put('/update', updateUser);

router.delete('/delete/:id', deleteUser);

module.exports = router;
