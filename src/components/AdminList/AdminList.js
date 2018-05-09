import React, {Component}from 'react';
import AdminListItem from '../AdminListItem/AdminListItem';
import AdminAddEdit from '../AdminAddEdit/AdminAddEdit';

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
        const listItems = list.map( user => {
            return (
                <div>
                    <AdminListItem
                    user = { user }
                    role = { type }
                    key = {user.id}
                    />
                </div>
            )
        })

        return (
            <div>
                <div>
                    <h2>{type}</h2>
                    <button onClick = { () => this.handleClick(true)}>New</button>
                    { this.state.add
                       ? <AdminAddEdit
                        handleClickFn = {this.handleClick}
                        new = { true }
                       />
                       : null
                    }
                </div>
                {listItems}
                
            </div>
        )

    }
}

export default AdminList;