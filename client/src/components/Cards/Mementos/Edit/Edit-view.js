import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const EditView = ({ onEditClick, onDeleteClick }) => {
    return <div class="dropdown is-hoverable" style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
    }}>
        <div class="dropdown-trigger">
            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4"
            ><FontAwesomeIcon icon={'edit'} size='lg' />
            </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu4" role="menu">
            <div class="dropdown-content">
                <a href="javascript:function() { return false; }"
                    onClick={onEditClick}
                    class="dropdown-item">
                    edit
                </a>
                <a href="javascript:function() { return false; }"
                    onClick={onDeleteClick}
                    class="dropdown-item">
                    delete
                </a>
            </div>
        </div>
    </div>
}

export default EditView