import React from 'react'
import './button.scss'

function Button({type,shape,className,children,onClick}) {
    
    let btnClass = "primary";
    
    
    (type === 'secondary') && (btnClass = "secondary");
    (shape === "round") && (btnClass = btnClass + " round");
    
       
    return (
        <button className={className+" "+ btnClass} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button
