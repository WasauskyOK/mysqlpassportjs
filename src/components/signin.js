import React, { Component } from 'react';
import  {Redirect} from  'react-router-dom';
export default class signin extends Component {
    constructor(){
        super();
        this.state={
            email:"",
            password:"",
            msjSignIn:""
        }
        this.ChangeState.bind(this);
        this.IniciarSesion.bind(this);
    }
    async ChangeState(e){
        await  this.setState({
                [e.target.name]:e.target.value
            });
        }
        IniciarSesion(e){
            e.preventDefault();
            const {email,password}=this.state;
            fetch("http://localhost:6543/signin",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({email,password})
            })
            .then(data=>data.json())
            .then(data=>
                {
                    
                        //const isAuthenticate=data.isAuthenticate;
                        if(data.isAuthenticate===true){
                            window.localStorage.setItem('setAuthenticated',true);
                            window.location.href="/profile";
                        }
                        //this.props.history.push('/profile');
                    
                    if(data.error){
                        document.querySelector("#TextosAleatorios").innerHTML=data.error;
                        this.setState({
                            msjSignIn:data.error
                        })
                    }
                }
                )
            .catch(err=>console.log(err));
        }
       
    render() {
        if(localStorage.getItem("setAuthenticated")!==null){
            console.log("gaaaa signin");
            return <Redirect to='/profile'></Redirect>
        }; 
        return (
            <div className="container border ">
                 {(this.state.msjSignIn.length>0)?<div className="alert alert-danger text-center  mt-2">{this.state.msjSignIn}</div>:<div></div>}
                <div className="row d-flex justify-content-center align-items-center" style={{height:"80vh"}}>
                    <div className="card shadow col-md-4 text-center" >
                        <div className="card-header">
                            <h5>Iniciar Sesion</h5>
                        </div>
                        <p id="TextosAleatorios"></p>
                        <div className="card-body text-center">
                            <form onSubmit={this.IniciarSesion.bind(this)}>
                                <div className="form-group">
                                    <input type="email" placeholder="Ingresa tu correo" name="email" onChange={this.ChangeState.bind(this)} required className="mt-3 form-control" />
                                </div>
            
                                <div className="form-group">
                                    <input type="password" placeholder="Ingresa tu contraseña" name="password" onChange={this.ChangeState.bind(this)} required className="mt-3 form-control" />
                                </div>
                                <button className="btn btn-success btn-block">
                                    Iniciar Sesion
                                </button>
                            </form>
                        </div>          
                    </div>

                


                </div>
            </div>
        )
    }
}
