import React, { Component } from 'react'
import { checkValidity } from '../../../shared/checkValidity';
import { connect } from 'react-redux';
import InputHolder from './InputHolder/InputHolder';
import PrimaryButton from '../../UI/Buttons/PrimaryButton/PrimaryButton';

import './AddTabForm.scss';

class AddTabForm extends Component {
    state = {
        controls: {
            url: {  
                elementFrame: { type: 'text', value: '', autoFocus: true },
                validation: { required: true, isURL: true },
                valid: false,
                touched: false
            },
            importance: {
                elementFrame: { col:"30", rows:"7", placeholder: 'Why is this tab important to you?', value: '', maxLength: 240 },
                validation: { required: false, maxLength: 240 },
                valid: true,
                touched: false
            },
            category: {
                elementFrame: { type: 'text', value: '', placeholder: "Give us a tag/category" },
                validation: { required: false },
                valid: true,
                touched: false
            }
        }
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
    submitFormHandler = () => {
        let formData = {
            url: this.state.controls.url.elementFrame.value,
            importance: this.state.controls.importance.elementFrame.value,
            category: this.state.controls.category.elementFrame.value
        }
    }

    render() {
        let canSubmit = true;
        for (let control in this.state.controls) {
            if (canSubmit && this.state.controls[control].valid === false) {
                canSubmit = false;
            }
        }
        return (
          <form className="AddTabForm">
            <div className="AddTabForm__Header">
              <h2>We'll need some information about your new Tab</h2>
            </div>
            <InputHolder 
                submit={this.submitFormHandler} 
                controls={this.state.controls} 
                canSubmitForm={canSubmit}
                inputChange={this.inputChangedHandler}
            />
            <div className="AddTabForm__SubmitButton" onClick={this.submitFormHandler}>
                <PrimaryButton disabled={!canSubmit}>{canSubmit && "We'll take care of the rest!"}</PrimaryButton>
            </div>
          </form>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAddTab: () => {}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTabForm);
