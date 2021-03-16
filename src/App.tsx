import React from 'react'
import './App.css'
import 'antd/dist/antd.css'
import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'
import { NavLink, Redirect, Route, Switch } from 'react-router-dom'
import { Login } from './components/Login/Login'
import { initializeThunk } from './redux/appReducer'
import { connect } from 'react-redux'
import Preloader from './components/common/preloader/Preloader'
import { withSuspend } from './hoc/withSuspense'
import { AppStateType } from './redux/reduxStore'
import { getInitializedApp } from './redux/usersSelectors'
import { Button } from 'antd'

import { Layout, Menu, Breadcrumb } from 'antd'
import { UserOutlined, LaptopOutlined } from '@ant-design/icons'
import { Header } from './components/Header/Header'

const { SubMenu } = Menu
const { Content, Footer, Sider } = Layout

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const UsersContainer = React.lazy(() => import('./components/users/UsersContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const ChatPage = React.lazy(() => import('./Pages/ChatPage'))

const SuspendedDialog = withSuspend(DialogsContainer)
const SuspendedProfile = withSuspend(ProfileContainer)
const SuspendedUsers = withSuspend(UsersContainer)
const SuspendedChatPage = withSuspend(ChatPage)


class App extends React.Component<MapProps & DispatchProps> {

  catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    alert("Some error occured!")
  }

  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
  }

  componentDidMount() {
    this.props.initializeThunk()
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (

      <Layout>
        <Header />
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
            <Sider className="site-layout-background" width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
              >
                <SubMenu key="sub1" icon={<UserOutlined />} title="My profile">
                  <Menu.Item key="1"><NavLink to='/profile'>Profile</NavLink></Menu.Item>
                  <Menu.Item key="2"><NavLink to='/dialogs'>Messages</NavLink></Menu.Item>
                  <Menu.Item key="3"><NavLink to='/chat'>Chat</NavLink></Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<LaptopOutlined />} title="Developers">
                  <Menu.Item key="5"><NavLink to='/developers'>Developers</NavLink></Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <Switch>
                <Route exact render={() => <Redirect to={"/profile"} />} path='/' />

                <Route render={() => <SuspendedProfile />} path='/profile/:userID?' />

                <Route render={() => <SuspendedDialog />} path='/dialogs' />

                <Route render={() => <SuspendedUsers />} path='/developers' />

                <Route render={() => <SuspendedChatPage />} path='/chat' />

                <Route component={News} path='/news' />
                <Route component={Music} path='/music' />
                <Route component={Settings} path='/settings' />
                <Route render={() => <div>Facebook</div>} path='/login/facebook' />
                <Route render={() => <Login />} path='/login' />
                <Route render={() => <div>404 NOT FOUND
               <Button type={'dashed'}>OK</Button>
                </div>} path='*' />
              </Switch>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>


      // <div className='app-wraper'>
      //   <HeaderContainer />
    )
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: getInitializedApp(state)
})

export default connect(mapStateToProps, { initializeThunk })(App)


type MapProps = {
  initialized: boolean
}
type DispatchProps = {
  initializeThunk: () => void
}
