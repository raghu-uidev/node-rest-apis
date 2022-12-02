import { Connect, Query } from "../configs/mysql";

const userRegisterModel = async (name: string, email: string, password: string, userId: string | undefined, cartId: string, isUserIdExists: boolean) => {
    let query = `insert into users (user_name, email, password, user_id, cart_id) values ('${name}', '${email}', '${password}', '${userId}', '${cartId}')`;
    if(isUserIdExists) {
        query = `update users set user_name = '${name}', email = '${email}', password = '${password}' where user_id='${userId}'`;
    }
    console.log(query);
    return new Promise((resolve, reject) => {
        Connect().then((connection) => {
           Query(connection, query).then((result) => {
               resolve(result);
           }).catch((error) => {
               reject(error);
           }).finally(() => {
              connection.end();
           });
        }).catch((error)=> {
           reject(error);
        });
    });
}

const userLoginModel = async (userName: string) => {
    let query = `select * from users where email='${userName}';`;
    
    return new Promise((resolve, reject) => {
        Connect().then((connection) => {
           Query(connection, query).then((result) => {
               resolve(result);
           }).catch((error) => {
               reject(error);
           }).finally(() => {
              connection.end();
           });
        }).catch((error)=> {
           reject(error);
        });
    });
}


const getUserByEmailModel = async (email: string) => {
    let query = `select * from users where email='${email}';`;
    return new Promise((resolve, reject) => {
        Connect().then((connection) => {
           Query(connection, query).then((result) => {
               resolve(result);
           }).catch((error) => {
               reject(error);
           }).finally(() => {
              connection.end();
           });
        }).catch((error)=> {
           reject(error);
        });
    });
}


const userModel = {
    userRegisterModel: userRegisterModel,
    userLoginModel: userLoginModel,
    getUserByEmailModel: getUserByEmailModel
}

export default userModel;