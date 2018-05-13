import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import StudentSelector from './StudentSelector';
import CourseBuilderTool from './CourseBuilderTool';

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
                console.log(response.data)
              this.setState({courseTemplates: response.data})
            });
         }

    render() {
        console.log('PROPS:', this.props)
        const curriculumTemplate = this.state.courseTemplates.map(template =>{
            return <option value={template.curriculum_name} key={template.id}>{template.curriculum_name}</option>
        })
        return ( 
            <div>
            <h1>
                Course Builder View
            </h1>


                <div style={{display:'flex'}}>
                    <div className='ui card'>
                    <CourseBuilderTool curriculumTemplate={curriculumTemplate}/>
                    </div>

                    <div className='ui card'>
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