import React from 'react';

import "./CancelButton.scss";

const cancel = (props) => (
    <button type="button" className={!props.disabled && "CancelButton"} disabled={props.disabled}>
		{props.children}
	</button>
)

export default cancel;