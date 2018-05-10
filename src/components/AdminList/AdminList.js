import React, {Component}from 'react';
import AdminAddEdit from '../AdminAddEdit/AdminAddEdit';
import { Modal, Button, Header, Table } from 'semantic-ui-react';

class AdminList extends Component{
    constructor(){
        super();
        this.state = {
            list:[
                {
                    name:'',
                    email:'',
                    phone:'',
                    userType:'',
                    id:-1
                }
            ],
            add:false,
            type:''
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick ( bool ){
        this.setState({
            add:bool
        })
    }

    componentDidMount(){
        const { list, type } = this.props;
        this.setState({
            list,
            type
        })
    }


    render(){
        const { list, type } = this.state;
        const editModal = () => (
            <Modal trigger={<Button>New</Button>}>
                <Modal.Header>NEW</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                    <AdminAddEdit
                        handleClickFn = {this.handleClick}
                        adjust = 'Save'
                       />
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
        const listItems = list.map( user => {
            return (
                <Table.Row>
                    <Table.Cell>{user.name}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.phone}</Table.Cell>
                    <Table.Cell>{user.id}</Table.Cell>
                    <Table.Cell>
                        <Modal trigger={<Button>Edit</Button>}>
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