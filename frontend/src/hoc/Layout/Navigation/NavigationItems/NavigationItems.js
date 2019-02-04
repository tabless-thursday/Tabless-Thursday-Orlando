import React from 'react';
import { NavLink } from 'react-router-dom'

import './NavigationItems.scss';

const navigationItems = () => (
    <ul className="NavigationItems">
        <li className="NavigationItem"><NavLink to="/tbd">Home</NavLink></li>
        <li className="NavigationItem"><NavLink to="/login">Authenticate</NavLink></li>
        <li className="NavigationItem"><NavLink to="/add-tab">Add Tab</NavLink></li>
        <li className="NavigationItem"><NavLink to="/my-tabs">My Tabs</NavLink></li>
    </ul>
)

export default navigationItems;