const MYSQL_HOST = 'sql.freedb.tech';
const MYSQL_DATABASE =  'freedb_ecommercedb';
const MYSQL_USER =  'freedb_sqladmin';
const MYSQL_PASS =  'ZTNe%7bcVHb3&Sm';

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
    server: SERVER,
    authSecretKey: 'wewew-434ed-sder-dddf3'
};

export default config;