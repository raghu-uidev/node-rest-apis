import { v4 as uuidv4 } from 'uuid';
import userModel from '../models/users.model';
import {hash, compare} from 'bcrypt';

const userRegisterService = async (name: string, email: string, password: string) => {
    const userId = uuidv4();
    const cartId = uuidv4();
    const checkUser =  await isUserExists(email);
    const encryptedPassword = await hash(password, 10);
    return new Promise((resolve, reject) => {
        if(!checkUser) {
            userModel.userRegiterModel(name, email, encryptedPassword, userId, cartId).then((result) => {
                resolve(result);
            }).catch((error) => {
                reject({message: 'Unable to register user'});
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
           
            const isPasswordMatched = await compare(password, encryptedPassword);
            console.log('isPasswordMatched:'+ isPasswordMatched);
            if(isPasswordMatched){
                resolve({message: 'User logged in successfully'});
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