import React, { Component } from 'react';
import SideDrawer from './Navigation/SideDrawer/SideDrawer';
import Navbar from './Navigation/Navbar/Navbar';
import LayoutContext from './layout-context';


class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    
    toggleHandler = () => {
        this.setState(prevState => ({showSideDrawer: !prevState.showSideDrawer}))
    }

    render(){
        const mainStyle = { 
            transform:`translateX(${ this.state.showSideDrawer ? '-300px': '0px'})`, 
            transition:"transform 0.3s ease-out" 
        }
        return (
            <React.Fragment>
                <LayoutContext.Provider value={{opened:this.state.showSideDrawer, toggle: this.toggleHandler}}>
                    <Navbar logoShow={this.state.showSideDrawer}/>
                    <SideDrawer/>
                </LayoutContext.Provider>
                <main style={mainStyle}>
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }
}

export default Layout;