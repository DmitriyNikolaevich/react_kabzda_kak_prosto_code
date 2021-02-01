import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import s from './Dialog.module.css'

type PropsType = {
    id: number
    name: string
}

const Dialog: FC<PropsType> = ({ id, name }) => {
    let path = "/dialogs/" + id;
    return (
                <div className={s.dialog + ' ' + s.active}>
                    <NavLink to={path}>{name}</NavLink>
                </div>
    )
}

export default Dialog