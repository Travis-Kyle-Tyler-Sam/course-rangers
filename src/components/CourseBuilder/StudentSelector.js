import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Modal, Button, Header, Table, Pagination, Input, Form } from 'semantic-ui-react';





class StudentSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            students: [],
            adminID:1
        }
    }

componentDidMount(){
}
    
    render() { 
        return ( <div>
             <h3>Students</h3>
             <input placeholder='Auto-Complete list of all students'/>
             <Pagination
                defaultActivePage={1}
                totalPages={this.state.totalPages}
                onPageChange={(event, data) => this.handlePage(data.activePage)}
                />
        </div> )
    }
}
 
export default StudentSelector;