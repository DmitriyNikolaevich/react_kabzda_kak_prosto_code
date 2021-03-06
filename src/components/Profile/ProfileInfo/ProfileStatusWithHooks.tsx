import { ChangeEvent, useEffect } from 'react'
import { useState } from 'react'

const ProfileStatusWithHooks = (props: PropsTypes) => {

    let [editMode, setEditMode] = useState(true)
    let [status, setStatus] = useState(props.status)

    useEffect( () => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(false)
    }

    const deactivateEditMode = () => {
        setEditMode(true)
        props.updateStatus(status)
    }

    const onStatusChenge = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {editMode
                ? <div>
                    <b>Status</b>: <span onDoubleClick={activateEditMode} >{status || "Введите статус"}</span>
                  </div>
                : <div>
                    <input autoFocus={true} onChange={onStatusChenge} value={status || ''} onBlur={ deactivateEditMode } />
                  </div>
            }
        </div>
    )

}

export default ProfileStatusWithHooks


type PropsTypes = {
    status: string
    updateStatus: (status: string) => void
}