import { Button, Col, Menu, Row } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { getIsAuth, getLogin } from '../../redux/usersSelectors'
import { logoutThunk } from '../../redux/authReducer'

import { Layout } from 'antd'

export const Header: React.FC = (props) => {

    const isAuth = useSelector(getIsAuth)
    const login = useSelector(getLogin)

    const dispatch = useDispatch()

    const logout = () => {
        dispatch(logoutThunk())
    }

    const { Header } = Layout

    return (
        <Header className="header">
            <Row>
                <Col span={20}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1"><NavLink to='/developers'>Developers</NavLink></Menu.Item>
                    </Menu>
                </Col>
                <Col span={4}>
                    <div>
                        {isAuth
                            ? <div>
                                <Avatar alt={login || ''} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                                <Button onClick={logout}>Log out</Button>
                            </div>
                            : <NavLink to={'/login'}>Login</NavLink>}
                    </div>
                </Col>
            </Row>
        </Header>
    )
}