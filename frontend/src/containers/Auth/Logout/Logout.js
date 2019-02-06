import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import actions from '../../../store/actions';

class Logout extends Component {

    componentDidMount() {
        this.props.onLogout();
    }

  render() {
    return <Redirect to="/authenticate" />
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.auth.logout())
  }
}

export default connect(null, mapDispatchToProps)(Logout)
