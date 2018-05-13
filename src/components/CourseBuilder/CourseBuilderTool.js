import React, { Component } from 'react';
class CourseBuilderTool extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <div>
                <h3>Course Name</h3>
                        <p>Curriculum Template: <select>{this.props.curriculumTemplate}</select></p>
                        <p>Start Date: <input type="date"/></p>
                        <p>End Date: <input type="date"/></p>
        </div> )
    }
}
 
export default CourseBuilderTool;