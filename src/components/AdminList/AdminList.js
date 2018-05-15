import React, {Component}from 'react';
import AdminAddEdit from '../AdminAddEdit/AdminAddEdit';
import { Modal, Button, Header, Table, Pagination, Input, Form } from 'semantic-ui-react';
import './AdminList.css';
import _ from 'lodash';

class AdminList extends Component{
    constructor(props){
        super(props);
        this.state = {
            list:[],
            modalOpen:false,
            type:this.props.type,
            currentPage:1,
            totalPages:Math.ceil(this.props.list.length/5),
            searchString:'',
            searchList:[],
            column:null,
            direction:null
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleListChange = this.handleListChange.bind(this);
    }
    
    
    componentDidUpdate(prevProps, prevState, snapshot){
        const { list } = this.props;
        const { list:prevList } = prevState;
        let bool = true;
        if (list.length !== prevList.length){
            bool = false;
        } else {
            list.forEach( (user, i) => {
                if (user.name === prevList[i].name &&
                    user.email === prevList[i].email &&
                    user.phone === prevList[i].phone &&
                    user.userType === prevList[i].userType &&
                    user.id === prevList[i].id 
                    ){
                        null
                    } else bool = false
            })
        }
        
        if(!bool){
            let pages = Math.ceil(this.props.list.length/5)
            this.setState({
                totalPages:pages,
                list:list,
                searchList:list
            })
        }
        
    }
    handleClick ( bool ){
        this.setState({
            modalOpen:bool
        })
    }
    handleListChange(){
        this.setState({
            column:null,
            direction:null
        })
    }
    handlePage( pageIndex ){
        this.setState({
            currentPage:pageIndex
        })
    }
    searchList(){
        const { list, searchString } = this.state;
        let filteredList = list.filter( user => {
            return user.name.toLowerCase().includes(searchString) === true
        })
        this.setState({
            searchList:filteredList,
            totalPages:Math.ceil(filteredList.length/5)
        })
        this.handleListChange()
    }
    handleSort = clickedColumn => () => {
        const { column, direction, searchList} = this.state;
        if (column !== clickedColumn){
            this.setState({
                column:clickedColumn,
                searchList: _.sortBy(searchList, (user) => { 
                    if (typeof user[clickedColumn] === 'string')
                        {
                            return user[clickedColumn].toLowerCase()
                        } else return user[clickedColumn]
                }
                ),
                direction:'ascending'
            })
            return
        }
        this.setState({
            searchList:searchList.reverse(),
            direction:direction === 'ascending' ? 'descending' : 'ascending'
        })
    }
    render(){
        // const { list, type } = this.state;
        const { handleUsersChangeFn, type, addUserFn, editUserFn, deleteUserFn } = this.props;
        const { currentPage, searchList, column, direction } = this.state;
        const editModal = () => (
            
            <AdminAddEdit
                handleClickFn = {this.handleClick}
                adjust = 'Save'
                callbackFn = {addUserFn}
                key = 'new'
                deleteUserFn = {deleteUserFn}
                handleListChangeFn = {this.handleListChange}
            />

        )
        const listItems = searchList.map( (user,i) => {
            if (Math.ceil((i+1)/5)===currentPage){
                return (
                    <Table.Row key={user.id}>
                        <Table.Cell id={`${user.name}_cell`}>{user.name}</Table.Cell>
                        <Table.Cell >{user.email}</Table.Cell>
                        <Table.Cell id={`${user.phone}_cell`}>{user.phone}</Table.Cell>
                        <Table.Cell >{user.id}</Table.Cell>
                        <Table.Cell >
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
                                deleteUserFn = {deleteUserFn}
                                handleListChangeFn = {this.handleListChange}
                            />
                        </Table.Cell>
                    </Table.Row>
                )
            }
        })
        return (
            <div>
                <div>
                    <h2>{type}</h2>
                    <div className='topOfTable'>
                        
                        <Form>
                            <Input onChange={ e => this.setState({
                                searchString:e.target.value}
                                )}
                                />
                            <Button onClick={ () => {
                                this.searchList()
                            }}>Search</Button>
                            
                        </Form>
                        {editModal()}
                    </div>
                </div>
                
                <Table striped={true} compact={true} sortable={true} celled fixed>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell sorted={column === 'name' ? direction: null} onClick={this.handleSort('name')}>Name</Table.HeaderCell>
                            <Table.HeaderCell sorted={column === 'email' ? direction: null} onClick={this.handleSort('email')}>Email</Table.HeaderCell>
                            <Table.HeaderCell sorted={column === 'phone' ? direction: null} onClick={this.handleSort('phone')}>Phone</Table.HeaderCell>
                            <Table.HeaderCell sorted={column === 'id' ? direction: null} onClick={this.handleSort('id')}>ID</Table.HeaderCell>
                            <Table.HeaderCell>Edit</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {listItems}
                    </Table.Body>
                </Table>
                <Pagination
                defaultActivePage={1}
                totalPages={this.state.totalPages}
                onPageChange={(event, data) => this.handlePage(data.activePage)}
                />
            </div>
        )

    }
}

export default AdminList;