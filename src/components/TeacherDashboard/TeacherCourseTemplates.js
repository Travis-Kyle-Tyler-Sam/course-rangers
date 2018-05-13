import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

class TeacherCourseTemplates extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            courseTemplates: []
         }
    }

componentDidMount(){
this.getTeachersCourseTemplates()
}

 getTeachersCourseTemplates() {
    axios.get('/api/teacherdash/:teacher_id').then(response => {
        console.log(response.data)
      this.setState({courseTemplates: response.data})
    });
 }

deleteCourseTemplate(id){
    axios.delete(`/api/delete_curriculum/${id}`).then(response =>{
     return this.getTeachersCourseTemplates()
    })
}

    render() { 
       let currentTemplates = this.state.courseTemplates.map(template=>{
        return <p><span key={template.id}>{template.curriculum_name}</span>
        <span><Link to= {{pathname: '/curriculumbuilder', state: {currentCurriculum: template}}}>
            <button>Edit</button>
             </Link></span>
        <span><button onClick={()=>{
            this.deleteCourseTemplate(template.id)
        }}>Delete</button></span>
        </p>
        })
        return ( <div>
            
             <Link to= '/curriculumbuilder'>
            <button>Add New Course Template</button>
             </Link>
            {currentTemplates}

        </div> )
    }
}
 
export default TeacherCourseTemplates;