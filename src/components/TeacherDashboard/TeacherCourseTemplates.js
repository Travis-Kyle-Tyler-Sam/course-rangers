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
        <span><button><Link to= '/curriculumbuilder'    
        template={template}
        >
            Edit
             </Link></button></span>
        <span><button onClick={()=>{
            this.deleteCourseTemplate(template.id)
        }}>Delete</button></span>
        </p>
        })
        return ( <div>
            
            <button>  <Link to= '/curriculumbuilder'>
            Add New Course Template
             </Link></button>
            {currentTemplates}

        </div> )
    }
}
 
export default TeacherCourseTemplates;