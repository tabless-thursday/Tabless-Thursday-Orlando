import React, { Component } from 'react';
import { connect } from 'react-redux'
import actions from '../../store/actions';
import UpdateTabForm from '../../components/AddTab/UpdateTabForm/UpdateTabForm';
import Modal from '../../components/UI/Modal/Modal';
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
    cancelUpdateHandler = () => {
        this.setState({idOfTagToUpdate: null})
    }

    render() {
        let copiedTabs = [...this.props.tabs];
        const tabElements = copiedTabs.reduce((accum, tab, i) => {
            const valuesInCurrentColumn = accum[accum.length - 1];
            if (valuesInCurrentColumn !== undefined && valuesInCurrentColumn.length < 5) {
                const updatedCurrentColumn = [...accum[accum.length - 1], tab]
                accum.pop();
                return [...accum, updatedCurrentColumn]
            }
            return [...accum, [tab]]
        }, [])
            const userTabs = tabElements.map((column, i) => {
                return (
                <div key={i} className="TabsColumn">
                    {column.map(tab => {
                        return (<MyTab tagEdit={(e) => this.tagEditHandler(e, tab.tabId)} deleteTab={() => this.props.onDeleteTab(tab.tabId)} key={tab.tabId} tab={tab} />)
                        })}
                </div>
            )})
        let modal = null;
        if (this.state.idOfTagToUpdate) {
            modal = (<Modal title="Update Your Tab" cancelUpdate={this.cancelUpdateHandler}>
                        <UpdateTabForm cancelUpdate={this.cancelUpdateHandler} tab={this.props.tabs.find(tab => tab.tabId === this.state.idOfTagToUpdate)}/>
                    </Modal>)
        }
        return (
            <div className="MyTabsContainer">
                {modal}
                {userTabs.length > 0 ? userTabs : <p style={{marginLeft: "5rem", fontSize:"1.4rem"}}>Start adding some tabs!</p>}
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