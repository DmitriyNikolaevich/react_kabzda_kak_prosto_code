import React from 'react';
import './App.css';
import Nav from './components/Nav/Nav';
//import DialogsContainer from './components/Dialogs/DialogsContainer';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import { Route } from 'react-router-dom';
//import UsersContainer from './components/users/UsersContainer';
//import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { initializeThunk } from './redux/appReducer';
import { connect } from 'react-redux';
import Preloader from './components/common/preloader/Preloader';
import { withSuspend } from './hoc/withSuspense';

const DialogsContainer = React.lazy( () => import('./components/Dialogs/DialogsContainer'));
const UsersContainer = React.lazy( () => import('./components/users/UsersContainer'));
const ProfileContainer = React.lazy( () => import('./components/Profile/ProfileContainer'));


class App extends React.Component {

  componentDidMount() {
    this.props.initializeThunk();
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

          <Route render={withSuspend(ProfileContainer)} path='/profile/:userID?' />

          <Route render={withSuspend(DialogsContainer)} path='/dialogs' />

          <Route render={withSuspend(UsersContainer)} path='/users' />

          <Route component={News} path='/news' />
          <Route component={Music} path='/music' />
          <Route component={Settings} path='/settings' />
          <Route component={Login} path='/login' />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

export default connect(mapStateToProps, {initializeThunk})(App);

