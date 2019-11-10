import React, { Component } from 'react';
import  {Link,Redirect} from  'react-router-dom';
export default class profile extends Component {
/*
 {
                    (2<5)?<div>tue</div>:<div>sad</div>
                }
*/

        constructor(){
            super();
                this.state={
                   
                    nombre:"daniel"
                }
                //this.CerrarSesion.bind(this);
            }

       async CerrarSesion(){
            
          await  localStorage.setItem("setAuthenticated",false);
          await localStorage.clear();
          sessionStorage.clear();  
          
          //window.localStorage.clear();
            this.props.history.push('/signin');
            //window.location.href="/signin";
        }
            
    render() {
        //const isAuthenticate=window.localStorage.getItem("setAuthenticated");
        //const isAuthenticate=window.localStorage.getItem("setAuthenticated");
            
        if(localStorage.getItem("setAuthenticated")===null){
            console.log("gaaaa");
            return <Redirect to='/signin'></Redirect>
        }; 
        
        return (
            <div>
                  <div className="d-flex bd-highlight bg-danger  mb-3 ">
                    <div className="mr-auto p-2 "><Link className="nav-link text-white" to="/profile">Profile</Link></div>
                        <div className="p-2 bd-highlight">
                            <button className="btn btn-danger text-white" onClick={this.CerrarSesion.bind(this)} >Cerrar Sesion</button>
                        </div>

                </div>
                Hola a todos
            </div>
        );
    }
}
