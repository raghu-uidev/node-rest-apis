import { v4 as uuidv4 } from 'uuid';
import userRegiterModel from '../models/users.model';

const userRegisterService = async (name: string, email: string, password: string) => {
    const userId = uuidv4();
    const cartId = uuidv4();
    console.log('userId:' + userId);
    console.log('cartId:' + cartId);
    return new Promise((resolve, reject) => {
        userRegiterModel(name, email, password, userId, cartId).then((result) => {
            resolve(result);
        }).catch((error) => {
            reject(error);
        });
    });  
}

export default userRegisterService;