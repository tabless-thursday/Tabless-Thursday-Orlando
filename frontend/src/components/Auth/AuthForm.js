import React from 'react';
import PrimaryButton from '../UI/Buttons/PrimaryButton/PrimaryButton';
import SecondaryButton from '../UI/Buttons/SecondaryButton/SecondaryButton';
import Input from '../UI/Inputs/Input/Input';

import './AuthForm.scss';


const authForm = (props) => {
    let canSubmit = true;
    props.controls.forEach(control => {
        if (canSubmit && control.frame.valid === false) {
            canSubmit = false
        }
    })
    let inputs = props.controls.map(control => <Input
                                                    canSubmitForm={canSubmit} 
                                                    submit={props.submitForm}
                                                    key={control.id}
                                                    elementFrame={control.frame.elementFrame}
                                                    changed={(e) => props.inputChanged(e, control.id)}
                                                    shouldValidate={control.frame.validation}
                                                    touched={control.frame.touched}
                                                    invalid={!control.frame.valid}
                                                />)
    
    return (
        <div className={props.isSignUp ? "AuthContainer SignUp" : "AuthContainer"}>
            <div className="BackgroundImage"></div>
            <form className="AuthForm">
                <h1>{props.isSignUp ? "Sign Up" : "Sign In"}<p>to continue to Tabless Thursday</p></h1>
                <div className="InputsHolder">
                    {inputs}
                </div>
                <div className="LoginActionHolder">
                    <div className="AuthLoginButton" onClick={props.submitForm}>
                        <PrimaryButton disabled={!canSubmit}>{props.isSignUp ? "Sign Up" : "Login"}</PrimaryButton>
                    </div>
                    <div className="AuthCancelButton" onClick={props.switchToSignUp}>
                        <SecondaryButton>Switch to {props.isSignUp ? "Sign In" : "Sign Up"}</SecondaryButton>
                    </div>
                </div>
            </form>
        </div>
    )
}


export default authForm;