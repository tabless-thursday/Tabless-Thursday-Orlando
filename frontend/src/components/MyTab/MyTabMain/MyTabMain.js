import React from 'react'

import './MyTabMain.scss';

const myTabMain = (props) => (
    <div className="MyTab__Main">
        <img src={props.src} alt="icon" width="16" height="16" />
        <p>
            <a href={props.href} className="RealLink" target="_blank" rel="noopener noreferrer">{props.href.toString()}</a>
            <a className="FakeLink">{props.placeLink}</a>
        </p>
    </div>
)

export default myTabMain
