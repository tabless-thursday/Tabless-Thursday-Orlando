import React from 'react';

import "./PrimaryButton.scss";

const primaryButton = (props) => (
    <button type="button" className={!props.disabled ? "PrimaryButton" : null} disabled={props.disabled}>
		{props.children}
	</button>
)

export default primaryButton;