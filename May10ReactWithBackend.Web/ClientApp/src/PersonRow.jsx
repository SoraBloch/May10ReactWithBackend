import React from 'react';

export default function PersonRow({ person, onEditClick, onDeleteClick, isChecked, onCheckChange }) {
    const { firstName, lastName, age } = person;
    return (
        <tr>
            <td>
                <div className="d-flex justify-content-center align-items-center">
                    <input type="checkbox" checked={isChecked} onChange={ onCheckChange } className="form-check-input mt-2" />
                </div>
            </td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td>
                <button onClick={onEditClick} className="btn btn-warning">Edit</button>
                <button onClick={onDeleteClick} className="btn btn-danger" style={{ marginLeft: '10px' }}>Delete</button>
            </td>
        </tr>
    )
}
