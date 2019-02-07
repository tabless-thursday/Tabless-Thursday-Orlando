import React from 'react'

import './MyTabBody.scss';



const myTabBody = (props) => (
    <div className="MyTab__Body">
        <p><span>Reason: </span>{props.importance}</p>
        <p><span>Category: </span>{props.category}</p>
    </div>
)

export default myTabBody
