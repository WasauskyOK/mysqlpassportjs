import React from 'react'
import  Navigation from  './navigation'

const  layoutsign=  (props)  =>{

    return (
        <React.Fragment>
            <Navigation/>
            {props.children}
        </React.Fragment>
    );
}
export default  layoutsign;