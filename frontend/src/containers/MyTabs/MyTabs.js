import React, { Component } from 'react';
import { connect } from 'react-redux'
import actions from '../../store/actions';

import MyTab from '../../components/MyTab/MyTab';


import './MyTabs.scss';

class MyTabs extends Component {

    componentDidMount() {
        this.props.onFetchUserTabs(this.props.userId)
    }
    
    render() {
        let copiedTabs = [...this.props.tabs];
        let copiedColumnedTabs = copiedTabs.reduce((accum, tab, i) => {
            if (i === 0) {
                return [[tab]]
            }
            let currentAccumIndex = accum.length - 1;
            if (accum[currentAccumIndex].length <= 4) {
                let currentColumn = [...accum[currentAccumIndex]]
                currentColumn.push(tab)
                accum.pop()
                accum.push(currentColumn);
                return accum
            }
            accum.push([])
            return accum
        }, [])
            const userTabs = copiedColumnedTabs.map((column, i) => {
                return (
                <div key={i} className="TabsColumn">
                    {column.map(tab => {
                        return (<MyTab key={tab.tabId} tab={tab} />)
                        })}
                </div>
            )})
        return (
            <div className="MyTabsContainer">
                {/* <img src="https://udemy.com/favicon.ico" height="16" width="16" alt="icon" /> */}
                {userTabs}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        tabs: state.tabs.userTabs,
        userId: state.auth.user._id
    }
}
const mapDispacthToProps = dispatch => {
    return {
        onFetchUserTabs: (userId) => dispatch(actions.tabs.fetchTabs(userId))
    }
}

export default connect(mapStateToProps, mapDispacthToProps)(MyTabs);