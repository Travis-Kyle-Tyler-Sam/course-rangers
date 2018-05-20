import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import StudentSearch from './StudentSearch';




class StudentSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            students: [],
        }
    }


    
    render() { 
        return ( <div>
             <h3>Students</h3>
                <StudentSearch 
                    studentIds={this.props.studentIds}/>
                
        </div> )
    }
}
 
export default StudentSelector;