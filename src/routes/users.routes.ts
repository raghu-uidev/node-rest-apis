import express from 'express';
import userController from '../controllers/users.controller';

const userRoutes = express.Router();

// user registration API
userRoutes.post('/register', userController.usersRegisterController);

// user login API
userRoutes.post('/login', userController.userLoginController);

// user update API
userRoutes.put('/update/:userId', userController.usersRegisterController);


export default userRoutes;