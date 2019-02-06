import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkValidity } from '../../shared/checkValidity';
import bookMarkSVG from '../../assests/images/bookmarks.svg';
import checkingSVG from '../../assests/images/checking_boxes.svg';
import AuthForm from '../../components/Auth/AuthForm';
import actions from '../../store/actions/'
import Spinner from '../../components/UI/Spinner/Spinner';

import './Auth.scss';

class Auth extends Component {
    state = {
        isSignUp: true,
        controls: {
            username: {
                showOnSignUpOnly: false,
                elementFrame: { type: 'text', placeholder: 'Username', value: '' },
                validation: { required: true, minLength: 4 },
                valid: false,
                touched: false
            },
            password: {
                showOnSignUpOnly: false,
                elementFrame: { type: 'password', placeholder: 'Password', value: '' },
                validation: { required: true, minLength: 6 },
                valid: false,
                touched: false
            },
            email: {
                showOnSignUpOnly: true,
                elementFrame: { type: 'email', placeholder: 'Email', value: '' },
                validation: { required: true, isEmail: true },
                valid: false,
                touched: false
            },
            phone: {
                showOnSignUpOnly: true,
                elementFrame: { type: 'text', placeholder: 'Phone', value: '' },
                validation: { required: true, minLength: 10, maxLength: 10 },
                valid: false,
                touched: false
            },
        }
    }

    switchMethodHandler = () => {
        this.setState(prevState => ({isSignUp: !prevState.isSignUp}))
    }
    submitFormHandler = () => {
        let formData = {
            username: this.state.controls.username.elementFrame.value,
            password: this.state.controls.password.elementFrame.value,
        }
        if (this.state.isSignUp) {
            formData.email = this.state.controls.email.elementFrame.value;
            formData.phone = this.state.controls.phone.elementFrame.value;
        }
        this.props.onAuth(formData, this.state.isSignUp)
    }
    inputChangedHandler = (e, elementName) => {
        e.persist()
        this.setState(prevState => {
            const updatedControls = {...prevState.controls, ...{
                [elementName]: {...prevState.controls[elementName], ...{
                    valid: checkValidity(e.target.value, prevState.controls[elementName].validation),
                    touched: true,
                    elementFrame: {...prevState.controls[elementName].elementFrame, ...{value: e.target.value}}
                }}
            }}
            return { controls: updatedControls }
        })
    }

    render() {
        if (this.props.authError) {
            throw new Error(this.props.authError)
        }
        let formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                frame: this.state.controls[key]
            });
        } 
        formElementsArray = this.state.isSignUp ? formElementsArray : formElementsArray.filter(formElement => formElement.frame.showOnSignUpOnly === false)
        let authForm = (
            <AuthForm 
                controls={formElementsArray} 
                isSignUp={this.state.isSignUp} 
                switchToSignUp={this.switchMethodHandler} 
                submitForm={this.submitFormHandler}
                inputChanged={this.inputChangedHandler}
            />
        )
        if (this.props.authenticating) {
            authForm = <Spinner />
        }
        return (
            <div className="AuthPageContainer">
                <div className="BookmarkSVGContainer">
                    <img src={bookMarkSVG} alt="bookmarks" />
                </div>
                {authForm}
                <div className="CheckingSVGContainer">
                    <img src={checkingSVG} alt="bookmarks" />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        authenticating: state.auth.loading,
        authError: state.auth.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (AuthData, isSignUp) => dispatch(actions.auth.executeAuth(AuthData, isSignUp)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);