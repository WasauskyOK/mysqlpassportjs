import mongoose,{Schema} from  'mongoose';
import bcrypt from 'bcryptjs';
const SchemaUser=new Schema({
    email:{type:String,required:true},
    password:{type:String,required:true}
//    permisos:{type:String,required:true}
});
    //cifrar password con bcrypt 
    //esta relacionado con el schema

    //ingresa la password 
    //le damos al modulo bcrypt y lo cifra  y lo guarda ala bd con 
    //la password  cifrada
    SchemaUser.methods.encryptPassword=(password)=>{
      return bcrypt.hashSync(password,bcrypt.genSaltSync(10));
    };
    SchemaUser.methods.comparePassword=function(password){
        //return true --> conciden
        //return false -->  no conciden  
        return bcrypt.compareSync(password,this.password);
    };
export default mongoose.model("User",SchemaUser);