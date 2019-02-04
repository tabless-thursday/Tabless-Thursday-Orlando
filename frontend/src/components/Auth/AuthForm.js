import React from 'react';
import PrimaryButton from '../UI/Buttons/PrimaryButton/PrimaryButton';
import CancelButton from '../UI/Buttons/CancelButton/CancelButton';
import Input from '../UI/Inputs/Input/Input';
import PasswordInput from '../UI/Inputs/PasswordInput/PasswordInput';

import './AuthForm.scss';


const authForm = (props) => (
    <div className="AuthContainer">
        <div class="BackgroundImage"></div>
        <form className="AuthForm">
            <h1>Sign In<p>to continue to Tabless Thursday</p></h1>
            <div className="AuthInputs">
               <Input label="Username" />
               <PasswordInput label="Password" />
            </div>
            <div className="LoginActionHolder">
                <div className="AuthLoginButton">
                    <PrimaryButton>Login</PrimaryButton>
                </div>
                <div className="AuthCancelButton">
                    <CancelButton>Cancel</CancelButton>
                </div>
            </div>
        </form>
    </div>

)


export default authForm;