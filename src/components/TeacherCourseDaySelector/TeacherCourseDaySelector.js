import React, { Component } from 'react';
class TeacherCourseDaySelector extends Component {
    constructor(props) {
        super(props);
        //// filter by params   +this.props.match.params.courseid

        this.state = {  }
    }
    render() { 
        console.log(+this.props.match.params.courseid)
        return ( 
            <div>
                
            Hello


            </div>
         )
    }
}
 
export default TeacherCourseDaySelector;