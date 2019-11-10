import React, { Component } from 'react'
import  {Link} from  'react-router-dom'
export default class navigation extends Component {
    render() {
        return (
            <div className="d-flex bd-highlight bg-danger  mb-3 ">
                
                <div className="mr-auto p-2 "><Link className="nav-link text-white" to="/">Inicio</Link></div>
                <div className="p-2 bd-highlight">

                   
                        <Link className="nav-link text-white" to="/signin">SignIn</Link>
                  
                    
                    </div>
                <div className="p-2 bd-highlight"><Link className="nav-link text-white" to="/signup">SignUp</Link></div>
          
          </div>
        )
    }
}
