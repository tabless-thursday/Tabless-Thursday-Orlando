import React, { Component } from 'react';
import { Switch, Redirect, Route, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import actions from './store/actions'

import AuthPage from './containers/Auth/Auth';
import AddTabPage from './containers/AddTab/AddTab';
import Layout from './hoc/Layout/Layout';
import Logout from './containers/Auth/Logout/Logout';
import MyTabsPage from './containers/MyTabs/MyTabs';
import ErrorBoundary from './hoc/ErrorBoundary/ErrorBoundary';

import './App.scss';


class App extends Component {

  componentDidMount() {
    this.props.onAppLoadTrySignIn()
  }

  render() {
    let routes = (
      <Switch>
        <Redirect from="/" exact to="/authenticate" />
        <Route path="/authenticate" component={AuthPage} />
        <Redirect to="/authenticate" />
      </Switch>
  )
  let greetings = null;
        if (this.props.displayGreet) {
            greetings = (<div className="GreetingWrapper"><p>Welcome back {this.props.username}!</p></div>)
        }
  if (this.props.authenticated) {
    routes = (
      <Switch>
        <Route path="/my-tabs" component={MyTabsPage} />
        <Route path="/add-tab" component={AddTabPage} />
        <Route path="/logout" component={Logout} />
        <Redirect to="/my-tabs" />
      </Switch>
    )
  } 
    return (
      <div className="App">
        <ErrorBoundary>
          <Layout showProtectedLinks={this.props.authenticated}>
            {greetings}
            {routes}
          </Layout>
        </ErrorBoundary>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.user.token !== null,
    displayGreet: state.auth.greet,
    username: state.auth.user.username
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAppLoadTrySignIn: () => dispatch(actions.auth.checkAuth())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
