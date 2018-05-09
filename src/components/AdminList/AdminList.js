import React, {Component}from 'react';
import AdminListItem from '../AdminListItem/AdminListItem';
import AdminAddEdit from '../AdminAddEdit/AdminAddEdit';

class AdminList extends Component{
    constructor(){
        super();
        this.state = {
            add:false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick ( bool ){
        this.setState({
            add:bool
        })
    }
    render(){
        const { list, type } = this.props;
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