import React from 'react';
import './PasswordInput.scss';

const input = (props) => {
    let passwordInput = React.createRef();
    let spanButton = React.createRef();
    const showPasswordHandler = () => {
        if (passwordInput.current.type === "text") {
            passwordInput.current.type = "password";
            spanButton.current.textContent = "SHOW"
        } else if(passwordInput.current.type === "password") {
            passwordInput.current.type = "text";
            spanButton.current.textContent = "HIDE"
        }
    }
    
    return (
        <div className="InputHolder">
            <input 
                className="PasswordInput" 
                value={props.value} 
                onChange={props.changed} 
                placeholder={props.label}
                type="password"
                ref={passwordInput}
            />
            <span onClick={showPasswordHandler} ref={spanButton}>SHOW</span>
            <label className="Label">{props.label}</label>
        </div>
        )
}

export default input;