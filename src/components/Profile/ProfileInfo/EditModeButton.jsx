import React from 'react';

const EditModeButton = ({editMode, deactivateEditMode, activateEditMode}) => {
    return (
        <div>
            {editMode
                ? <button onClick={deactivateEditMode}><b>Save profile data</b></button>
                : <button onClick={activateEditMode}><b>Edit profile</b></button>
            }
        </div>
    )
}

export default EditModeButton;