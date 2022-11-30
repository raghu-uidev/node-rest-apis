import mysql from 'mysql2';
import config from './config';

const params = {
    user: config.mysql.user,
    password: config.mysql.password,
    host: config.mysql.host,
    database: config.mysql.database
};



const Connect = async () =>
    new Promise<mysql.Connection>((resolve, reject) => {
        console.log('In Connection Promise');
        const connection = mysql.createConnection(params);

        // This will check for a promise again and gives back error or null
        connection.connect((error) => {
            console.log('connection error:' + error);
            if (error) {
                reject(error);
                console.log('Connection reject called');
                return;
            } else {
                console.log('Got connection:');
                resolve(connection);
                console.log('Connection resolve called called');
            }
          
    });
});

const Query = async (connection: mysql.Connection, query: string) =>
    new Promise((resolve, reject) => {
        connection.query(query, connection, (error, result) => {
            if (error) {
                reject(error);
                return;
            } else {
                resolve(result);
            }
        });
});



export { Connect, Query };