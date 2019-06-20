import EditView from './Edit-view'
import React from 'react'


const Edit = ({ setEditing, setDeleting }) => <EditView
    onEditClick={() => {
        setEditing()
    }}
    onDeleteClick={() => setDeleting()}
/>

export default Edit