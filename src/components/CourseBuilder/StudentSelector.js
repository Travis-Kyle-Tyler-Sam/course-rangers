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

componentDidMount(){
    axios.get('/api/getAllStudents').then( response=>{
        console.log(response.data)
        this.setState({students: response.data})
    })
}
    
    render() { 
        console.log(this.state.students)
        return ( <div>
             <h3>Students</h3>
             <input placeholder='Auto-Complete list of all students'/>
                <StudentSearch students={this.state.students}/>
        </div> )
    }
}
 
export default StudentSelector;