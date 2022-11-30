import { v4 as uuidv4 } from 'uuid';
import userModel from '../models/users.model';
import * as passwordHash from 'password-hash';

const userRegisterService = async (name: string, email: string, password: string) => {
    const userId = uuidv4();
    const cartId = uuidv4();
    // const encryptedPassword = passwordHash.generate(password);
    // console.log('original password:'+ password);
    // console.log('encrypted password:' + encryptedPassword);
    return new Promise((resolve, reject) => {
        userModel.userRegiterModel(name, email, password, userId, cartId).then((result) => {
            resolve(true);
       }).catch((error) => {
            reject(error);
      });
    });  
}

const userLoginService =async (userName:string, password: string) => {
    return new Promise((resolve, reject) => {
        userModel.userLoginModel(userName, password).then((result: any)=> {
          if(result.length > 0) {
            resolve({message: 'User logged in successfully'});
          } else {
            resolve({message: 'No user found with this email/password'});
          }
        }).catch((error) => {
           reject(error);
        })
    });
}

const userService = {
    userRegisterService: userRegisterService,
    userLoginService: userLoginService
}

export default userService;