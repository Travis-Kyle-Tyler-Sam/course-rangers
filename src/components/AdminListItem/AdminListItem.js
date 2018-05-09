import React, {Component} from 'react';
import AdminAddEdit from '../AdminAddEdit/AdminAddEdit';

class AdminListItem extends Component{
    constructor(){
        super();
        this.state = {
            edit:false
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick ( bool ){
        this.setState({
            edit: bool
        })
    }
    render(){
        const { user } = this.props;
        return (
            <div>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <p>id: {user.id}</p>
                <button onClick={ () => this.handleClick(true)}>
                    Edit
                </button>
                {this.state.edit 
                ?   <AdminAddEdit
                    name = {user.name}
                    email = {user.email}
                    phone = {user.phone}
                    id = {user.id}
                    role = {user.role}
                    handleClickFn = {this.handleClick}
                    />
                : null
                }
            </div>
        )
    }
}

export default AdminListItem;