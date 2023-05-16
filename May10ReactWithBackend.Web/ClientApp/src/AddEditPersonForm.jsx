﻿import React from 'react';

export default function AddEditPersonForm({ firstName, lastName, age, onTextChange, onAddClick, editForm, onUpdateClick, onCancelClick }) {
    if (!editForm) {
        return <div className="row p-5 rounded" style={{ backgroundColor: '#E9ECEF' }}>
            <div className="col-md-3">
                <input value={firstName} onChange={onTextChange} name='firstName' type="text" className="form-control" placeholder="First Name" />
            </div>
            <div className="col-md-3">
                <input value={lastName} onChange={onTextChange} name='lastName' type="text" className="form-control" placeholder="Last Name" />
            </div>
            <div className="col-md-3">
                <input value={age} onChange={onTextChange} name='age' type="text" className="form-control" placeholder="Age" />
            </div>
            <div className="col-md-3">
                <button onClick={onAddClick} className='btn btn-primary w-100'>Add</button>
            </div>
        </div>
    }
    else {
        return <div className="row p-5 rounded" style={{ backgroundColor: '#E9ECEF' }}>
            <div className="col-md-3">
                <input value={firstName} onChange={onTextChange} name='firstName' type="text" className="form-control" placeholder="First Name" />
            </div>
            <div className="col-md-3">
                <input value={lastName} onChange={onTextChange} name='lastName' type="text" className="form-control" placeholder="Last Name" />
            </div>
            <div className="col-md-3">
                <input value={age} onChange={onTextChange} name='age' type="text" className="form-control" placeholder="Age" />
            </div>
            <div className="col-md-3">
                <button onClick={onUpdateClick} className='btn btn-warning w-100'>Update</button>
                <button onClick={onCancelClick} className='btn btn-dark w-100'>Cancel</button>
            </div>
        </div>
    }

}