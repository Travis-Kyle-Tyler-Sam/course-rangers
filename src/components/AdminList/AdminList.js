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
        const { handleUsersChangeFn, list, type } = this.props;
        const editModal = () => (
            <Modal trigger={<Button >New</Button>}
            closeIcon={true}
            open={this.state.modalOpen}
            >
                <Modal.Header>NEW</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                    <AdminAddEdit
                        handleClickFn = {this.handleClick}
                        adjust = 'Save'
                        handleUsersChangeFn = {handleUsersChangeFn}
                       />
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
        const listItems = list.map( user => {
            return (
                <Table.Row key={user.id}>
                    <Table.Cell>{user.name}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.phone}</Table.Cell>
                    <Table.Cell>{user.id}</Table.Cell>
                    <Table.Cell>
                        <Modal trigger={<Button onClick={() => this.handleClick(true)}>Edit</Button>}
                        open={this.state.modalOpen}
                        >
                            <Modal.Header>EDIT</Modal.Header>
                            <Modal.Content>
                                <AdminAddEdit
                                    name = {user.name}
                                    email = {user.email}
                                    phone = {user.phone}
                                    id = {user.id}
                                    role = {user.userType}
                                    handleClickFn = {this.handleClick}
                                    adjust = 'Edit'
                                    handleUsersChangeFn = {handleUsersChangeFn}
                                    key={user.id}
                                    />
                            </Modal.Content> 
                        </Modal>
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