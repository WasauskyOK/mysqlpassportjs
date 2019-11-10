//import  express from  'express';

import express from 'express';
import  morgan from 'morgan';
import  routes from  './routes/routes';
import  conexion from  './conection/conex';
import  passport from  'passport';
//import  session from 'express-session';
import  cors from  'cors';
import  {localauth} from './passport/local-auth';
//import  flash from 'connect-flash';
import  cookieSession from  'cookie-session';
class application{
    constructor(){
        this.app=express();
        this.config();
        this.routes();
    }
    config(){
        
        this.app.set("PORT",process.env.PORT||6543);
        
        //middlewars
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(morgan("dev"));
        this.app.use(express.urlencoded({extended:false})); 
        
        //modulo express-session para ver como guaardarmos los datos
        //en la sesion
        this.app.use(cookieSession({
            name: 'session',
            keys: ['key1', 'key2']
          }))
        // this.app.use(session({
        //     secret:"GoDanie",
        //     resave:false,
        //     saveUninitialized:false
        // }));
        //connect flash pobla req.flash para mandar mensajes
      //  this.app.use(flash());
        //inicializa  passport
        this.app.use(passport.initialize());
        
        //middlewares para guardar en una sesion
        this.app.use(passport.session());
        
             
        //this.app(passport.session());

        //CREO MIDDLEWARE PARA CREAR VARIABLES DE MENSAJE DE ERROR O CONFIRMACION EN LA LOCALSTORAGE
        /*
        this.app.use((req,resp,next)=>{
                const  msjCorreoInvalido=req.flash("SignUpMessageError");
                localStorage.setItem("correoinvalido",msjCorreoInvalido);
                console.log(localStorage.getItem("correoinvalido")+"msj xd");
            next();
        });
        */
            // this.app.use((req,resp,next)=>{
                

            //     //resp.locals.msj3=req.flash("SignUpMessageError");
                
            //     req.msjerror5=req.flash("SignUpMessageError");
            
                
            //     // (()=>{
            //     //     const  local=localStorage.setItem("aw2",""+req.msjerror5); 
            
            //     // })();

            //     next();
            // })
    };
    routes(){
        this.app.use("/",routes);
    };
    start(){
        this.app.listen(this.app.get("PORT"),()=>{
            console.log("Sever is running");
        })
    };
}

new application().start();