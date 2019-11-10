
import  {Router} from  'express';
const  router=Router();
import  passport from  'passport';
//import signup from '../../src/components/signup';


router.get("/",(req,resp,next)=>{

    //console.log()
   // resp.send({message:"Recibido"+req.messagesign});    
});
/*signup
    get -->  Plantilla crear cuenta o registrarse

*/


router.get("/signup",(req,resp,next)=>{
   console.log("xdd"+req.flash("SignUpMessageError"))
    resp.send({message:"Recibido 2"});    
});


/*signup
    post -->crear cuenta o registrarse 
*/
// router.post("/signup",passport.authenticate('local-signup' ,{
//     successRedirect:'http://localhost:3000/signin',
//     failureRedirect:'http://localhost:3000/signup',
//     successFlash:true,
//     //passReqToCallback:true para pasarle el req  que se esta pasando desde el cliente
//     passReqToCallback:true
// }));

router.post("/signup",(req,res,next)=>{
    passport.authenticate('local-signup',function(error,user,info){
      //console.log(user2,"INFORMACION CORRECTA USER 2");
      //let inf=user2;
        if(error){
            return res.status(500).json({
                message:error || "Oops something happened"
            });
        }

        //const data={user,message:"Usuario creado correctamente"};
       
        //login persistente
        req.logIn(user,  function (error)  {
            
            if(error){
                  return res.status(500).json({
                        message:error || "Oops something happened"
                    });
            }
                //let data=Object.create(user);
                //data.isAuthenticated245=false;
                //let data={user,isAuthenticated:true};
               // console.log(Object.getOwnPropertyDescriptors(user));
                //console.log(data);
                
                
                //console.log(user._doc);
                //return res.send(Object.assign({isAuthenticate:true},{inf})); 
                console.log("Sesion SIGNUP  : "+JSON.stringify(req.session));
                return  res.send(user);
            
        });
    })(req,res,next);
});








/**********************************/

/*
    signin
        get --> Plantilla  iniciar session
*/

// router.get("/signin",(req,resp,next)=>{
//     //console.log()
//     try {
        
//         //localStorage.setItem("jh","asuidhiuashdsa"); 
        
//         console.log("Gaaaaaaaa9"+req.msjerror5);
    
//         resp.send("Hola daniel"); 
//     } catch (error) {
//         console.log(error);
//     }
     
// });
/*
    signin
        POST --> Iniciar Session 
*/
router.post("/signin",(req,res,next)=>{
    passport.authenticate('local-signin',function(error,user,info){
        //console.log(req.sessionID);
        if(error){
            return res.status(500).json({
                message:"Oops , something  happened",
                error:error || "Server error"
            });
        }
        //req.login persistente
        req.logIn(user,function (error){
            //console.log(data+" datos nuevos");
            if(error){
                  return res.status(500).json({
                        message:error || "Oops something happened"
                    });
            }
            console.log("OBJETO USER ",user.permisos);
            console.log("Sesion SIGNIN  : "+JSON.stringify(req.session));
            
            //delete user._doc.password;
            //user._doc 
            //Al iniciar Session Elimino la password para que no sea vista o almacenada en la localStorage
            return  res.json(Object.assign({isAuthenticate:true},user));
        });
    })(req,res,next);
});
// router.get('/word',(req,resp,next)=>{
//     //const user=req.session.passport.user;
//     // const  email=req.user;
//     // delete  req.user.password && req.body.password;
//     // console.log(email,req.body);
//     //console.log(user);
//     let objeto1={nombre:"daniel"};
//     objeto1.apellidoo="Lazaro";
//     resp.send(objeto1);
// });
module.exports=router;