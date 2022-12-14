import { v4 as uuidv4 } from 'uuid';
import userModel from '../models/users.model';
import {hash, compare} from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import config from '../configs/config';

const userRegisterService = async (name: string, email: string, password: string, isUserIdExists: boolean, loginUserId?: string | undefined)=> {
    let userId: string | undefined = uuidv4();
    const cartId = uuidv4();
    const checkUser =  await isUserExists(email);
    const encryptedPassword = await hash(password, 10);
    if(isUserIdExists) {
      userId = loginUserId;
    }
    return new Promise((resolve, reject) => {
        if(!checkUser || isUserIdExists) {
            userModel.userRegisterModel(name, email, encryptedPassword, userId, cartId, isUserIdExists).then((result) => {
                resolve(result);
            }).catch((error) => {
              if(isUserIdExists) {
                reject({message: 'Unable to update user details'});
              } else {
                reject({message: 'Unable to register user'});
              }
            });
        } else {
           reject({messge: 'User exist with this email'});
        }
    });  
}

const userLoginService = async (userName:string, password: string) => {
    return new Promise((resolve, reject) => {
        userModel.userLoginModel(userName).then(async (result: any)=> {
          if(result.length > 0) {
            const encryptedPassword = result[0].password;
            const userId = result[0].user_id;
            const cartId = result[0].cart_id;
            const isPasswordMatched = await compare(password, encryptedPassword);
            const token = jwt.sign({id: userId}, config.authSecretKey, {expiresIn: '2h'});
            if(isPasswordMatched){
                resolve({
                  userId: userId,
                  cartId: cartId,
                  token: token
                });
            } else {
                resolve({message: 'Invalid password for this username'});
            }
          } else {
            resolve({message: 'No user found with this email/password combination'});
          }
        }).catch((error) => {
           reject(error); 
        })
    });
}

const isUserExists =  async (email:string) => {
    return new Promise((resolve, reject) => {
        userModel.getUserByEmailModel(email).then((result: any)=> {
          console.log(result);
          if(result.length > 0) {
            resolve(true);
          } else {
            resolve(false);
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