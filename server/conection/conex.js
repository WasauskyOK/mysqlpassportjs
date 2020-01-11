require('dotenv').config();
import  mysql from 'mysql';
//import  cadena from '../config/config';

const  pool=mysql.createPool({
    host:process.env.host,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database
});
pool.getConnection((err,conection)=>{
    if(err)throw err;
    else{
        console.log("db is connected");
        pool.releaseConnection(conection);
    }
});
export default pool;
