import React, {Component}from 'react';
import AdminAddEdit from '../AdminAddEdit/AdminAddEdit';
import { Modal, Button, Header, Table } from 'semantic-ui-react';

class AdminList extends Component{
    constructor(props){
        super(props);
        this.state = {
            list:this.props.list,
            modalOpen:false,
            type:this.props.type
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick ( bool ){
        this.setState({
            modalOpen:bool
        })
    }
    render(){
        // const { list, type } = this.state;
        const { handleUsersChangeFn, list, type, addUserFn, editUserFn } = this.props;
        const editModal = () => (
            
            <AdminAddEdit
                handleClickFn = {this.handleClick}
                adjust = 'Save'
                callbackFn = {addUserFn}
                key = 'new'
            />

        )
        const listItems = list.map( user => {
            return (
                <Table.Row key={user.id}>
                    <Table.Cell>{user.name}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.phone}</Table.Cell>
                    <Table.Cell>{user.id}</Table.Cell>
                    <Table.Cell>
                        <AdminAddEdit
                            name = {user.name}
                            email = {user.email}
                            phone = {user.phone}
                            id = {user.id}
                            role = {user.userType}
                            handleClickFn = {this.handleClick}
                            adjust = 'Edit'
                            callbackFn = {editUserFn}
                            key={user.id}
                        />
                    </Table.Cell>
                </Table.Row>
            )
        })
        return (
            <div>
                <div>
                    <h2>{type}</h2>
                    {editModal()}  
                </div>
                <Table striped={true} >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Phone</Table.HeaderCell>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Edit</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {listItems}
                    </Table.Body>
                </Table>
            </div>
        )

    }
}

export default AdminList;