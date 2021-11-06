import React from 'react'
import './button.scss'

function Button({btnType,type,shape,className,children,onClick}) {
    
    let btnClass = "primary";
    
    
    (type === 'secondary') && (btnClass = "secondary");
    (shape === "round") && (btnClass = btnClass + " round");
    
       
    return (
        <button type={btnType} className={className+" "+ btnClass} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button
