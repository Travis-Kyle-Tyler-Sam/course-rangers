import React, { Component } from 'react';
import { Segment, Loader, Dimmer} from 'semantic-ui-react';
import StudentDaySelector from './StudentDaySelector/StudentDaySelector';
import StudentAssignmentResourceGrade from './StudentAssignmentResourceGrade/StudentAssignmentResourceGrade';
import axios from 'axios';
import './StudentCourseDetail.css'
class StudentCourseDetail extends Component {
    constructor(){
        super();
        this.state = {
            // course:'MATH',
            // daysArray:[],
            // assignments:[]
        }
    }

    componentDidMount(){
        const {courseid} = this.props.match.params;
        axios.get(`/api/student/getcoursedetail/${courseid}`).then( response => {
            this.setState({
                course:response.data.course[0],
                daysArray:response.data.daysArray,
                resources:response.data.resources,
                assignments:response.data.assignments
            })
        })
    }
    render(){
        const { assignments, resources, daysArray, course } = this.state;
        
        return(
            <div>
                { course
                ?
                <div>
                <h1>{course.course_name}</h1>
                    <div className='student-detail'>
                    <Segment>
                        <StudentDaySelector
                        daysArray = {daysArray}
                        />
                    </Segment>
                    <StudentAssignmentResourceGrade
                    assignments = {assignments}
                    resources = {resources}
                    course = {course}
                    />
                    </div>
                </div>
                : <Dimmer active>
                    <Loader/>
                </Dimmer>
                }
            </div>
        )
    }
}

export default StudentCourseDetail;