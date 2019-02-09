import React, { Component } from 'react'
import { checkValidity } from '../../../shared/checkValidity';
import { connect } from 'react-redux';
import InputHolder from '../AddTabForm/InputHolder/InputHolder';
import PrimaryButton from '../../UI/Buttons/PrimaryButton/PrimaryButton';
import CancelButton from '../../UI/Buttons/CancelButton/CancelButton';
import actions from '../../../store/actions';

import './UpdateTabForm.scss';

class AddTabForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            controls: {
                url: {  
                    elementFrame: { type: 'text', value: props.tab.tabUrl, readOnly: true, style: {outline:"none"} },
                    validation: { required: true, isURL: true },
                    valid: false,
                    touched: false
                },
                importance: {
                    elementFrame: { col:"30", rows:"7", autoFocus: true, placeholder: 'Why is this tab important to you?', value: props.tab.importance, maxLength: 140 },
                    validation: { required: false, maxLength: 140 },
                    valid: true,
                    touched: false
                },
                category: {
                    elementFrame: { type: 'text', value: props.tab.category, placeholder: "Give us a tag/category" },
                    validation: { required: false },
                    valid: true,
                    touched: false
                }
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
        this.props.onUpdateTab(formData, this.props.tab.tabId);
        this.props.cancelUpdate()
    }

    render() {
        return (
          <form className="UpdateForm">
            <div className="UpdateForm__Header">
              <h2>Update your tab</h2>
            </div>
            <InputHolder
                submit={this.submitFormHandler} 
                controls={this.state.controls} 
                canSubmitForm={true}
                inputChange={this.inputChangedHandler}
            />
            <div className="modal__actions">
                <div className="UpdateForm__SubmitButton" onClick={this.submitFormHandler}>
                    <PrimaryButton>Update</PrimaryButton>
                </div>
                <div className="UpdateForm__SubmitButton" onClick={this.props.cancelUpdate}>
                    <CancelButton>Cancel</CancelButton>
                </div>
            </div>
          </form>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateTab: (updatedTab, tabId) => dispatch(actions.tabs.updateTab(updatedTab, tabId))
    }
}

export default connect(null, mapDispatchToProps)(AddTabForm);
