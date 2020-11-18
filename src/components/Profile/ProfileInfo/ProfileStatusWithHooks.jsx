import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(true);
    let [status, setStatus] = useState(props.status);

    useEffect( () => {
        setStatus(props.status);
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(false);
    }

    const deactivateEditMode = () => {
        setEditMode(true);
        props.updateStatus(status);
    }

    const onStatusChenge = (e) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div>
            {editMode
                ? <div>
                    <span onDoubleClick={activateEditMode} >{status || "Введите статус"}</span>
                  </div>
                : <div>
                    <input autoFocus={true} onChange={onStatusChenge} value={status || ''} onBlur={ deactivateEditMode } />
                  </div>
            }
        </div>
    )

}

export default ProfileStatusWithHooks;