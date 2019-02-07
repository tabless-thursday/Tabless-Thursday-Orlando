import React, { Component } from 'react';
import { connect } from 'react-redux'
import actions from '../../store/actions';

import MyTab from '../../components/MyTab/MyTab';


import './MyTabs.scss';

class MyTabs extends Component {
    state = {
        idOfTagToUpdate: null
    }

    componentDidMount() {
        this.props.onFetchUserTabs(this.props.userId)
    }

    tagEditHandler = (e, tabId) => {
        e.stopPropagation();
        this.setState({idOfTagToUpdate: tabId})
    }
    
    render() {
        let copiedTabs = [...this.props.tabs];
        let copiedColumnedTabs = copiedTabs.reduce((accum, tab, i) => {
            if (i === 0) {
                return [[tab]]
            }
            let currentAccumIndex = accum.length - 1;
            if (accum[currentAccumIndex].length <= 3) {
                let currentColumn = [...accum[currentAccumIndex]]
                currentColumn.push(tab)
                accum.pop()
                accum.push(currentColumn);
                return accum
            }
            accum[currentAccumIndex].push(tab)
            accum.push([])
            return accum
        }, [])
            const userTabs = copiedColumnedTabs.map((column, i) => {
                return (
                <div key={i} className="TabsColumn">
                    {column.map(tab => {
                        return (<MyTab tagEdit={(e) => this.tagEditHandler(e, tab.tabId)} deleteTab={() => this.props.onDeleteTab(tab.tabId)} key={tab.tabId} tab={tab} />)
                        })}
                </div>
            )})
            console.log(this.state.idOfTagToUpdate)
        return (
            <div className="MyTabsContainer">
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
        onFetchUserTabs: (userId) => dispatch(actions.tabs.fetchTabs(userId)),
        onDeleteTab: (tabId) => dispatch(actions.tabs.deleteTab(tabId))
    }
}

export default connect(mapStateToProps, mapDispacthToProps)(MyTabs);