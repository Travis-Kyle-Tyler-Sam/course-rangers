import React, { Component } from 'react';
import { connect } from 'react-redux';

class TeacherCourseDaySelector extends Component {
    constructor(props) {
        super(props);
     

        this.state = {  }
    }
    render() { 
        console.log(+this.props.match.params.courseid)
        console.log(this.props.courses)
        return ( 
            <div>
                
            Hello


            </div>
         )
    }
}
function mapStateToProps(state) {
    return {
      courses: state.teachers.courses
    }
  }
  
  export default connect(mapStateToProps)(TeacherCourseDaySelector);