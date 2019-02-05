import React, { Component } from 'react'
import { checkValidity } from '../../../shared/checkValidity';
import InputHolder from './InputHolder/InputHolder';

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
                elementFrame: { col:"30", rows:"10", placeholder: 'Why is this tab important to you?', value: '', maxLength: 10 },
                validation: { required: true, minLength: 4, maxLength: 10 },
                valid: false,
                touched: false
            },
            category: {
                elementFrame: { type: 'text', value: '', placeholder: "Give us a tag/category" },
                validation: { required: true, minLength: 2 },
                valid: false,
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

    render() {
        return (
          <form className="AddTabForm">
            <div>
              <h2>We'll need some information about your new Tab</h2>
            </div>
            <InputHolder controls={this.state.controls} inputChange={this.inputChangedHandler}/>
            <button type="button">We'll take care of the rest!</button>
          </form>
        )
    }
}

export default AddTabForm
