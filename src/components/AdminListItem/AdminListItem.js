import React from 'react';

function AdminListItem (props){
    const { user } = props;


    return (
        <div>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>id: {user.id}</p>
            <button>Edit</button>
        </div>
    )
}

export default AdminListItem;