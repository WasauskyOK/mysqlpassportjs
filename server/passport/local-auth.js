//import passport from 'passport';
//import {Strategy} from 'passport-local';
import   User from '../models/ModelUser';
import passport from 'passport';
const LocalStrategy =require('passport-local').Strategy;
import bcrypt from 'bcryptjs';
import  Usuario from '../conection/conex';

//localstrategy --> Strategy
//recibe  1 obj de configuracion 
//que tipo va a recibir desde el cliente
// el 2 es un callback que va manejar esos datos

/* 
    una ves se registra el usuario  -- email y pasword
    se guarda en una archivo de un navegador
     --> una ves autenticado  se pasa el autenticado a todas las paginas
     para eso se serializara  y deserializar

        cuando se ejecuta done(null,newUser)   se ejecuta passport.serialize()
        una vez se tiene el usuario vamos a guardarlo  en un archivo y tenerlo para que 
        las distintas paginas  no pidan la ventana de logueo
     */
        //solo el id es lo vamos a estar intercambiando entre distintas paginas
       //cada  ves que navegemos entre otras paginas
       //pero eso va tener que se autenticado con el servidor
       //cada vez que viajemos a otras paginas , vamos a consultar ala base de datos 
       //devuelve al navegador
       // ---> proceso se realiza cada vez que  el usuario se autentique  
       //atraves del metodo local-signup
     passport.serializeUser((user,done)=>{
            
        //serializo su email

            done(null,user.email);
    });


    //cuando navegamos entre distintas  paginas
    //se valida lo que se guardo  osea el id  
    //se consulta ala base de datos 
    //se retorna el usuario
    passport.deserializeUser(async(email,done)=>{
    //serializo su id
        //busco el id si existe
        
        const usuario=await Usuario.query("select email from users where email=?",[email]) ; 
        //const  user=await User.findOne({email});        
       
        done(null,usuario);
    });

    passport.use('local-signin',new LocalStrategy({
        usernameField:'email',
        passwordField:'password',
        passReqToCallback:true
    },async (req,email,password,done)=>{


        await Usuario.query("select email from users where  email=? limit 1",[email],async (err,results,fields)=>{
            if(err)
            {
                return done(err,null);
            }
            if(results.length<1){
                return done("email incorrecto o email no existe",null);
            }
            if(results.length>0){
               
                await Usuario.query("select * from users where email=? limit 1",[email],(err,results,fields)=>{
                       
                            const  [{contrasena:passw}]=results;
                            const verificacionpassword=bcrypt.compareSync(password,passw);
                            if(verificacionpassword==false){
                                return done("Password no encontrado o incorrecto",null);
                            }
                            if(verificacionpassword==true){
                               // const [...rest]=results;
                               delete user.contrasena;
                                console.log("Login con exito",results[0]);
                                return done(null,results[0]);
                            }
                        
                });

                //const  [{email:correo}]=results;
                //console.log("Email dentro  "+correo);


            }
            // const isPasswordValid=bcrypt.compareSync(password,results[0].password);

            //     if(isPasswordValid==false){
            //         return  done("Password  no es correcta",null);
            //     }
            //console.log("RESULTS ",results);
            //console.log("FIELDS ",fields)
       

        });


        // User.findOne({email},(err,user)=>{
        //     if(err){
        //         return done(err,null);
        //     }
        //     if(!user){
        //         return done("Email incorrecto o Usuario no encontrado",null);
        //     }
        //     const isPasswordValid=bcrypt.compareSync(password,user.password);

        //     if(isPasswordValid==false){
        //         return  done("Email or Password  no son validos",null);
        //     }
        //     return done(null,user)//Si es correcto todo soo envio Usuario

        // });
    }));

passport.use('local-signup',new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
    // passReqToCallback:true -->  
    //en la funcion de abajo podra capturar ademas del email y password 
    //el req podra capturar
    //done --> callback - funcion es para devolver una respuesta
    //al cliente
}, async (req,username,password,done)=>{
    const email = req.body.email;
    //Agrego ala base de datos el nuevo usuario  con la password  cifrada
    
    await Usuario.query("select email from users where  email=?",[email],async (err,results,felds)=>{

        if(err){
         return done(err,null);
        }
        if(results.length>0){
            return done("El correo ya existe",null);
        }
        const encryptPass=bcrypt.hashSync(password,bcrypt.genSaltSync(10));
        
        await Usuario.query("insert into users values (?,?,'guest')",[email,encryptPass],async (err,results,fields)=>{
            if(err){
                return done(err,null);
            }
            await  Usuario.query("select * from users where  email=?",[email],(err,results,fields)=>{
                console.log(results[0]);
                return done(null,results[0]);
            });
            //console.log("results : ",results);
            //console.log("FILAS ",fields)
            //console.log(userssave);
               //return   done(null,results);
        });
    });
    
  /*  

     User.findOne({email},(err,user)=>{
         if(err){
            return done(err,null);
         }
         if(user){
            return done("El correo ya existe",null);
         }
         const encryptPassword=bcrypt.hashSync(password,bcrypt.genSaltSync(10));
         const  newUser=new User();
         newUser.email=email;
         newUser.password=encryptPassword;
        // newUser.permisos="Guest";
           newUser.save((error,userCreate)=>{
             if(error){
                return done(error,null);
             }
             return done(null,userCreate);
         });
*/
         //done para devolver las respuestas
         // return done(null,newUser) 


    // });
    
    // if(user){
    //     //aqui envio un req.flash  un mensaje de error
    //     //localStorage.setItem("msjcorreoerror","El  email ya existe");
    //     //await localStorage.setItem("msj2","Claro amigo");
    //     //console.log("usuario ya existe");
    //     //let localstorage2=new LocalStorage("./scratch");
    //     //localstorage2.setItem("losamigos2","comoestas");
    //     //localStorage.setItem("Losamigos","como estas");
    //     //console.log(localstorage2.getItem("losamigos2"));
    //     //return done(null,false,req.flash("SignUpMessageError","El email ya existe"));
        
    //     return done("El usuario ya existe",null);
    // }
    // else{ 
    //     const  newUser=new User();
    //     newUser.email=email;
    //     newUser.password=password;
    //     await  newUser.save();
    //     //done para devolver las respuestas
    //      return done(null,newUser)  
    // }
}));

export default passport;