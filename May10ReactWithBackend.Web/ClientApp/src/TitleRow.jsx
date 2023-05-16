import React from 'react';

export default function TitleRow() {
    return (
        <tr>
            <th style={{ width: '15%' }}>
                <button className="btn btn-danger w-100">Delete All</button>
                <button className="btn btn-outline-danger w-100 mt-2">Check All</button>
                <button className="btn btn-outline-danger w-100 mt-2">Uncheck All</button>
            </th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Edit/Delete</th>
        </tr>
    )
}