import React, { Component } from 'react';
import  {Redirect} from  'react-router-dom';
/*offset-md-4*/
// const  PopupErrorEmail=()=>{
//     let msjcorreo=localStorage.getItem("correoinvalido");  
//     if(msjcorreo.length>0){
//         return alert("Correo Invalido");
//     }
//     return (<div>1</div>)
// }
export default class signup extends Component {


    constructor(){
        super();
        this.state={
            email:"",
            password:"",
            msjSignUp:"",
            isAuthenticate:window.localStorage.getItem("setAuthenticated")
            
        }
        this.AgregarUsuario.bind(this);
        this.CambiarState.bind(this);
    }

    async CambiarState(e){
        await this.setState({
            [e.target.name]:e.target.value
        });
        console.log(this.state);
    }
    AgregarUsuario(e){
        e.preventDefault();
        const {email,password}=this.state;
        fetch("http://localhost:6543/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email,password})
        }).then(data=>{
            return data.json();
        }).then(data=>{
            // if(data.hasOwnProperty("isAuthenticate")){
            //     //console.log(data)
            //     alert(data.error);
            // }
            //console.log("message" in data);
            // if(data.isAuthenticate===true){
            //     alert(`Usuario Agregado : ${data.email}`);
            //     window.localStorage.getItem("setAuthenticated",true);
            //     //this.props.history.push('/signin');
            //     window.location.href="/signin";
            // }
            // if(data.hasOwnProperty("message")){
            //     alert(data.message);
            // }
            if(data.hasOwnProperty("email")){
                this.setState({
                    msjSignUp:data.email
                });
                //alert(`Hey ${data.email} acabas de crearte una nueva cuenta`);
                
                this.props.history.push('/signin');
            }
            if(data.hasOwnProperty("message")){
                //alert(data.message);
                this.setState({
                    email:"",
                    password:"",
                    msjSignUp:data.message
                })
            }
            console.log(data);
        }).catch(error=>{
            console.log(error);
        });


    }
    componentDidMount(){
        console.log(window.localStorage.getItem("setAuthenticated"));
    }
    render() {
        //const isAuthenticate=window.localStorage.getItem("setAuthenticated");
        if(localStorage.getItem("setAuthenticated")!==null){
            console.log("gaaaa signup");
            return <Redirect to='/profile'></Redirect>
        }; 
        return (   
            <div className="container border ">
               {(this.state.msjSignUp.length>0)?<div className="alert alert-danger text-center  mt-2">{this.state.msjSignUp}</div>:<div></div>}
                <div className="row d-flex justify-content-center align-items-center" style={{height:"80vh"}}>
                    <div className="card shadow col-md-4 text-center" >
                        <div className="card-header">
                            <h5>Crear Cuenta</h5>
                        </div>

                        <div className="card-body text-center">
                            <form onSubmit={this.AgregarUsuario.bind(this)}>
                                <div className="form-group">
                                    <input type="email" placeholder="Ingresa tu correo" value={this.state.email} name="email" onChange={this.CambiarState.bind(this)} required className="mt-3 form-control" />
                                </div>

                                <div className="form-group">
                                    <input type="password" placeholder="Ingresa tu contraseña" value={this.state.password} name="password" onChange={this.CambiarState.bind(this)} required className="mt-3 form-control" />
                                </div>
                                <button className="btn btn-success btn-block" type="submit">
                                    Crear Cuenta
                                </button>
                            </form>
                        </div>          
                    </div>

                


                </div>
            </div>
        )
    }
}
