import React from 'react';
import AdminListItem from '../AdminListItem/AdminListItem';

function AdminList (props){
    const { list, type } = props;
    const listItems = list.map( user => {
        return (
            <div>
                <AdminListItem
                user = { user }
                />
            </div>
        )
    })

    return (
        <div>
            <h2>{type}</h2>
            <button>New</button>
            {listItems}
        </div>
    )


}

export default AdminList