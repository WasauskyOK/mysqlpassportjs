import  mysql from 'mysql';
import  cadena from '../config/config';

const  pool=mysql.createPool(cadena.database);
pool.getConnection((err,conection)=>{
    if(err)throw err;
    else{
        console.log("db is connected");
        pool.releaseConnection(conection);
    }
});
export default pool;
