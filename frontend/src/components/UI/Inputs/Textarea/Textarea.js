import React from 'react';

const textarea = (props) => (
    <React.Fragment>
        <textarea onChange={props.changed} {...props.elementFrame} ></textarea>
        <p>{props.characters}/{props.elementFrame.maxLength}</p>
    </React.Fragment>
)

export default textarea;