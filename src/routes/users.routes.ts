import express, { Request, Response } from 'express';
import usersRegisterController from '../controllers/users.controller';

const userRoutes = express.Router();

userRoutes.post('/register', usersRegisterController);

export default userRoutes;