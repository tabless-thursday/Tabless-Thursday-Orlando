import React from 'react';

import './Textarea.scss';

const textarea = (props) => (
    <div className="TextareaWrapper">
        <textarea className="Textarea" onChange={props.changed} {...props.elementFrame} ></textarea>
        <p className={props.numChar === props.elementFrame.maxLength ? "Limit True" : "Limit"}>{props.numChar}/{props.elementFrame.maxLength}</p>
    </div>
)

export default textarea;