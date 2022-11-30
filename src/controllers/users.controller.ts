import { Request, Response } from 'express';
import userRegisterService from '../services/users.service';

const usersRegisterController = async (req: Request, res: Response) => {
    const {name, email, password} = req.body;
    console.log('In user controller');
    console.log(name, email, password);
    if(!password) {
       return res.status(400).send({message: 'Password not found'});
       
    } 
    if(!name) {
        return res.status(400).send({message: 'Name not found'});
       
    } 
    if(!email) {
        return res.status(400).send({message: 'Email not found'}); 
    }

    userRegisterService(name, email, password).then((success) => {
        console.log('resolve data:' + success);
        return  res.status(200).send({message: 'User registered successfully'}); 
    }).catch((error) => {
        console.log('reject data:' + error);
        return  res.status(500).send({message: 'Unable to register user'}); 
    });
}

export default usersRegisterController;