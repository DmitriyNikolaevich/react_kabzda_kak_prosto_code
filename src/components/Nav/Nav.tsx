import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './Nav.module.css'

const Nav: React.FC<PropsTypes> = (props) => {
    return (
        <nav className={s.nav}>
            <div>
                <NavLink to='/profile' activeClassName={s.active}>Profile</NavLink>
            </div>
            <div>
                <NavLink to='/dialogs' activeClassName={s.active}>Messages</NavLink>
            </div>
            <div>
                <NavLink to='/news' activeClassName={s.active}>News</NavLink>
            </div>
            <div>
                <NavLink to='/music' activeClassName={s.active}>Music</NavLink>
            </div>
            <div>
                <NavLink to='/users' activeClassName={s.active}>Users</NavLink>
            </div>
            <div>
                <NavLink to='/settings' activeClassName={s.active}>Settings</NavLink>
            </div>
        </nav>
    )
}

export default Nav


type PropsTypes = {
    
}