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
            startDateInput: ''
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
       if(this.state.startDateInput != ''){ let momentizedDate = new Date(this.state.startDateInput)
        
        console.log(momentizedDate, momentizedDate.getDay())}
       
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
                        <input defaultValue={this.props.location.state.course === "" ? "" : this.props.location.state.course.course_name}/>
                        <p>Curriculum Template: <select>{curriculumTemplate}</select></p>
                        <p>Start Date: <input type="date" 
                        onChange={e=>{
                            this.setState({startDateInput: e.target.value})
                        }}
                        /></p>
                        <p>End Date: <input type="date" /></p>
                    <CourseBuilderTool courseInfo = {this.props.location.state.course}/>
                    </div>
                        
                    <div className='ui segment'>
                       <StudentSelector/>

                    </div>
                    </div>
                    <div>
                        <Link to='/teacherdashboard'><button>Cancel</button></Link>
                        <button>Submit</button>
                    </div>

            </div>
         )
    }
}
 
export default CourseBuilder;