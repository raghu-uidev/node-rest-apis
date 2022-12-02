import { Request, Response } from 'express';
import userService from '../services/users.service';

const usersRegisterController = async (req: Request, res: Response) => {
    const {name, email, password} = req.body;
    const userId = req.params.userId;
    const isUserExists: boolean = Boolean(userId); 
    if(!password) {
       return res.status(400).send({message: 'Password not found'});
       
    } 
    if(!name) {
        return res.status(400).send({message: 'Name not found'});
       
    } 
    if(!email) {
        return res.status(400).send({message: 'Email not found'}); 
    }

    userService.userRegisterService(name, email, password, isUserExists, userId).then((success) => {
        let responseMessage = {message: 'User registered successfully'};
        if(isUserExists) {
            responseMessage.message = 'User details updated successfully';
        }
        return  res.status(200).send(responseMessage); 
    }).catch((error) => {
        return  res.status(500).send(error); 
    });
}

const userLoginController = async (req: Request, res: Response) => {
    const {userName, password} = req.body;
    if(!userName) {
        return res.status(400).send({message: 'User name not found'});
    } 
    if(!password) {
        return res.status(400).send({message: 'Password not found'});
    }
     
    userService.userLoginService(userName, password).then((result) => {
        return res.status(200).send(result);
    }).catch((error) => {
        return res.status(500).send({message: 'Unable to login'});
    });
}

const userController = {
    usersRegisterController: usersRegisterController,
    userLoginController: userLoginController
}

export default userController;