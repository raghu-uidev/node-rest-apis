import { Connect, Query } from "../configs/mysql";

const userRegiterModel = async (name: string, email: string, password: string, userId: string, cartId: string) => {
    let query = `insert into users (user_name, email, password, user_id, cart_id) values ('${name}', '${email}', '${password}', '${userId}', '${cartId}')`;

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

export default userRegiterModel;