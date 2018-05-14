import React, { Component } from 'react';
class StudentSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }


    /// need a get endpoint that gets all users where access level = student
    //// pagination 
    //// auto complete on input
    
    render() { 
        return ( <div>
             <h3>Students</h3>
             <input placeholder='Auto-Complete list of all students'/>

        </div> )
    }
}
 
export default StudentSelector;