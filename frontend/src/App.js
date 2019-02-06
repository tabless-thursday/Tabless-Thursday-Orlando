import React, { Component, lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ErrorBoundary from './hoc/ErrorBoundary/ErrorBoundary';
import AuthPage from './containers/Auth/Auth';
import Layout from './hoc/Layout/Layout';
import './App.scss';
import MyTabsPage from './containers/MyTabs/MyTabs'

import actions from './store/actions';
const AsyncAddTab = lazy(() => import('./containers/AddTab/AddTab'));


class App extends Component {

  // componentDidMount() {
  //   this.props.checkAuth()
  // }

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
          <Route path="/my-tabs" component={MyTabsPage} />
          <Route path="/add-tab" component={props => <AsyncAddTab {...props} />} />
          <Redirect to="/my-tabs" />
        </Switch>
      )
    } 
    return (
      <ErrorBoundary>
        <Layout isAuth={this.props.isAuth}> 
          <div className="App">
            <Suspense fallback={<div>Loading...</div>}>
              {routes}
            </Suspense>
          </div>
        </Layout>
      </ErrorBoundary>
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
    checkAuth: () => dispatch(actions.auth.checkAuth())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
