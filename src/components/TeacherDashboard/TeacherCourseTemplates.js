import React, { Component } from 'react';
class TeacherCourseTemplates extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            courseTemplates: ['a', 'b', 'c']
         }
    }
    render() { 
       let currentTemplates = this.state.courseTemplates.map(template=>{
        return <p><span>Course Template Name</span>
        <span><button>Edit</button></span>
        <span><button>Delete</button></span>
        </p>
        })
        return ( <div>

            <button>Add New Course Template</button>
            {currentTemplates}

        </div> )
    }
}
 
export default TeacherCourseTemplates;