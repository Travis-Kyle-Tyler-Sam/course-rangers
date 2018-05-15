import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import StudentSelector from './StudentSelector';
import CourseBuilderTool from './CourseBuilderTool';
import moment from 'moment';

class CourseBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            courseTemplates: [],
            startDateInput: '',
            endDateInput: ''
         }
    }

    componentDidMount(){
        this.getTeachersCourseTemplates()
        }
        
         getTeachersCourseTemplates() {
            axios.get('/api/teacherdash/:teacher_id').then(response => {
              this.setState({courseTemplates: response.data})
            });
         }

    render() {
          const curriculumTemplate = this.state.courseTemplates.map(template =>{
            return <option value={template.curriculum_name} key={template.id + template.curriculum_name}>{template.curriculum_name}</option>
        })
        return ( 
            <div>
         <h1>
Course Builder View
</h1>

<div style={{display:'flex'}}>
    <div className='ui segment'>
       Curriculum Title: <input/>
        Curriculum Template: <select>{curriculumTemplate}</select>
        Start Date: <input type="date" 
        onChange={e=>{
            this.setState({startDateInput: e.target.value})
        }}/>
        End Date: <input type="date"  onChange={e=>{
            this.setState({endDateInput: e.target.value})
        }}/>
    <CourseBuilderTool 
    courseInfo = {'course info goes here? how the hell do i get this?'} 
    courseTemplates = {this.state.courseTemplates} 
    startDate = {this.state.startDateInput} 
    endDate = {this.state.endDateInput}/>
    </div>
        
    <div className='ui segment'>
       <StudentSelector/>
    </div>
    <div>

        <Link to='/teacherdashboard'><button>Cancel</button></Link>
        <button>Submit</button>
    </div>
</div>  
            </div>
         )
    }
};
 
export default CourseBuilder;