import React from 'react';
import './App.css';
import Nav from './components/Nav/Nav';
//import DialogsContainer from './components/Dialogs/DialogsContainer';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import { Redirect, Route, Switch } from 'react-router-dom';
//import UsersContainer from './components/users/UsersContainer';
//import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { initializeThunk } from './redux/appReducer';
import { connect } from 'react-redux';
import Preloader from './components/common/preloader/Preloader';
import { withSuspend } from './hoc/withSuspense';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const UsersContainer = React.lazy(() => import('./components/users/UsersContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));


class App extends React.Component {

  catchAllUnhandledErrors = (promiseRejectionEvent) => {
    alert("Some error occured!");
  }

  componentWillUnmount() {
    window.removeEventListener("unhandledrejections", this.catchAllUnhandledErrors);
  }

  componentDidMount() {
    this.props.initializeThunk();
    window.addEventListener("unhandledrejections", this.catchAllUnhandledErrors);
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      <div className='app-wraper'>
        <HeaderContainer />
        <Nav />
        <div className='content'>
          <Switch>
            <Route exact render={() => <Redirect to={"/profile"} />} path='/' />

            <Route render={withSuspend(ProfileContainer)} path='/profile/:userID?' />

            <Route render={withSuspend(DialogsContainer)} path='/dialogs' />

            <Route render={withSuspend(UsersContainer)} path='/users' />

            <Route component={News} path='/news' />
            <Route component={Music} path='/music' />
            <Route component={Settings} path='/settings' />
            <Route render={() => <div>Facebook</div>} path='/login/facebook' />
            <Route render={() => <Login/>} path='/login' />
            <Route render={() => <div>404 NOT FOUND</div>} path='*' />
          </Switch>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

export default connect(mapStateToProps, { initializeThunk })(App);

