import React, { Component, lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthPage from './containers/Auth/Auth';
import './App.scss';

const asyncMyTabsPage = lazy(() => import('./containers/MyTabs/MyTabs'))


class App extends Component {
  render() {
    let routes = (
        <Switch>
          <Redirect from="/" exact to="/authenticate" />
          <Route path="/authenticate" component={AuthPage}/>
        </Switch>
    )
    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Redirect from="/" exact to="/my-tabs" /> 
          <Route path="/my-tabs" component={asyncMyTabsPage} />
          <Redirect to="/my-tabs" />
        </Switch>
      )
    } 
    return (
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          {routes}
        </Suspense>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.user.token !== null
  }
}
const mapDispatchToProps = dispatch => {
  return {

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
