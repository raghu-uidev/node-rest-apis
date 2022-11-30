const MYSQL_HOST = 'localhost';
const MYSQL_DATABASE =  'ecommercedb';
const MYSQL_USER =  'sqladmin';
const MYSQL_PASS =  'start123';

const MYSQL = {
    host: MYSQL_HOST,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    password: MYSQL_PASS
};

const SERVER_HOSTNAME = 'localhost';
const SERVER_PORT =  4000;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const config = {
    mysql: MYSQL,
    server: SERVER
};

export default config;