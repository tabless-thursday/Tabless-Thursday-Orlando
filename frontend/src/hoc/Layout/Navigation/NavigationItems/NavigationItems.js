import React from 'react';
import { NavLink } from 'react-router-dom'
import LayoutContext from '../../layout-context';

import './NavigationItems.scss';

const navigationItems = () => (
    <LayoutContext.Consumer>
        {({isAuth}) => (
            <ul className="NavigationItems">
            <li className="NavigationItem">
                <a href="https://deploy-preview-1--pensive-mestorf-42e34b.netlify.com/" rel="noopener noreferrer" target="_blank">Home</a>
            </li>
            <li className="NavigationItem"><NavLink to="/authenticate">Authenticate</NavLink></li>
            {isAuth &&<li className="NavigationItem"><NavLink to="/add-tab">Add Tab</NavLink></li>}
            {isAuth && <li className="NavigationItem"><NavLink to="/my-tabs">My Tabs</NavLink></li>}
        </ul>
        )}
    </LayoutContext.Consumer>
    
)

export default navigationItems;