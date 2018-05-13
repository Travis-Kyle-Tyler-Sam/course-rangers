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
            courseTemplates: []
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

        console.log(this.props.location.state.course)
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
                        <p>Start Date: <input type="date" defaultValue={this.props.location.state.course? moment(this.props.location.state.course.start_date).format('YYYY-MM-DD'): ''}/></p>
                        <p>End Date: <input type="date" defaultValue={this.props.location.state.course? moment(this.props.location.state.course.completion_date).format('YYYY-MM-DD'): ''}/></p>
                    <CourseBuilderTool courseInfo = {this.props.location.state.course}/>
                    </div>
                        
                    <div className='ui segment'>
                       <StudentSelector/>

                    </div>
                    </div>
                    <div>
                        <Link to= '/teacherdashboard'><button>Cancel</button></Link>
                        <button>Submit</button>
                    </div>

            </div>
         )
    }
}
 
export default CourseBuilder;