import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './Header.module.css'

const Header: React.FC<PropsTypes> = (props) => {
    return (
        <header className={s.header}>
            <img src='https://c7.hotpng.com/preview/602/440/925/javascript-clip-art-openclipart-logo-number-js.jpg' alt="Alt text" />

            <div className={s.loginBlock}>
                {props.isAuth 
                ? <div>{props.login}<button onClick={props.logout}>Log out</button></div> 
                : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    )
}

export default Header


type PropsTypes = {
    isAuth: boolean
    login: string
    logout: () => void
}