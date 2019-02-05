import React from 'react'
import TextArea from '../../../UI/Inputs/Textarea/Textarea';

import './InputHolder.scss';

const inputHolder = (props) => {
    let categoryInputClass = "AddTab__categoryInput";
    if (!props.controls.category.valid && props.controls.category.touched) {
        categoryInputClass = "AddTab__categoryInput Invalid";
    }
    const urlInputClass = (!props.controls.url.valid && props.controls.url.validation && props.controls.url.touched) ? "AddTab__urlInput Invalid" : "AddTab__urlInput";
    const handleEnter = (e) => {
        if(e.key === "Enter" && props.canSubmitForm) {
            props.submit()
        }
    }
  return (
    <div className="InputsHolder">
          <div className="URLInputHolder">
              <input className={urlInputClass} {...props.controls.url.elementFrame} onChange={(e) => props.inputChange(e, "url")} />
              <span>URL</span>
          </div>
          <TextArea elementFrame={props.controls.importance.elementFrame} changed={(e) => props.inputChange(e, "importance")} />
          <input className={categoryInputClass} {...props.controls.category.elementFrame} onChange={(e) => props.inputChange(e, "category")} />
      </div>
  )
}

export default inputHolder