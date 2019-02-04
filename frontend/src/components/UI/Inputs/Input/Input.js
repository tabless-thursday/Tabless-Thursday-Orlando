// import React, { Component } from 'react';

// class Input extends Component {
//     constructor(props)

//     render(){
//         return (
//                 <div>
//                     <label className={labelUsernameClassName}>Username</label>
//                     <input value={props.inputValue} onChange={props.changed} name="username" placeholder="Username" autoFocus/>
//                 </div>
//         )
//     }
// }

// export default Input;


import React from 'react';
import './Input.scss';

const input = (props) => (
            <div className="InputHolder">
                <input 
                    className="Input" 
                    value={props.value} 
                    onChange={props.changed} 
                    placeholder={props.label}
                    type={props.type}
                />
                <label className="Label">{props.label}</label>
            </div>
            )

export default input;