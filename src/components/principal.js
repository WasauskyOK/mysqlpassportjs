import React, { Component } from 'react';
import {Redirect} from  'react-router-dom';

export default class principal extends Component {
    constructor(){
        super();
            this.state={
               
                nombre:"daniel"
            }
            //this.CerrarSesion.bind(this);
        }

    render() {
        if(localStorage.getItem("setAuthenticated")!==null){
            console.log("gaaaa principal");
            return <Redirect to='/profile'></Redirect>
        };
        return (
            
            <div>
                <h1>  Bienvenidos ala pagina principal</h1>

              
                
            </div>
        )
    }
}
