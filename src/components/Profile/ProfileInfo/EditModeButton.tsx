

const EditModeButton: React.FC<PropsTypes> = ({editMode, deactivateEditMode, activateEditMode}) => {
    return (
        <div>
            {editMode
                ? <button onClick={deactivateEditMode}><b>Save profile data</b></button>
                : <button onClick={activateEditMode}><b>Edit profile</b></button>
            }
        </div>
    )
}

export default EditModeButton

type PropsTypes = {
    editMode: boolean
    deactivateEditMode: () => void
    activateEditMode: () => void
}