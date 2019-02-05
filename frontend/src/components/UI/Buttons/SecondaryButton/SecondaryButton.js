import React from 'react';

import "./SecondaryButton.scss";

const secondaryButton = (props) => (
    <button type="button" className={!props.disabled && "SecondaryButton"} disabled={props.disabled}>
		{props.children}
	</button>
)

export default secondaryButton;