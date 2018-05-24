import React, {Component} from 'react';
import '../../StudentCourseDetail.css'
import StudentAssignmentDetail from './../../../../StudentAssignmentDetail/StudentAssignmentDetail';
import {Header, Segment, List, Table, Pagination} from 'semantic-ui-react';
import moment from 'moment';

class StudentCourseAssignments extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentPage:1,
            totalPages:Math.ceil(this.props.assignments.length/5)
        }
    }
    handlePage( pageIndex ){
        this.setState({
            currentPage:pageIndex
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if (prevProps.assignments.length !== this.props.assignments.length){
            this.setState({
                totalPages:(this.props.assignments.length/5)
            })
        }
    }
    render(){
        const {assignments, course, uploadFileFn} = this.props
        const list = assignments.map( (assignment, i) => {
            if (Math.ceil((i+1)/5) === this.state.currentPage){
                return(
                    <StudentAssignmentDetail
                        courseName = {course.course_name}
                        assignmentName = {assignment.name}
                        instructorName = {course.user_name}
                        dueDate = {moment(assignment.due_date).format('MM/DD')}
                        instructions = {assignment.description}
                        status = {assignment.point_scored ? 'Done': 'Incomplete'}
                        uploadFileFn = {uploadFileFn}
                        assignmentID = {assignment.id}
                        studentID = {assignment.student_id}
                        attachment = {assignment.attachment}
                        dateSubmitted = {assignment.date_submitted}
                    />
                )
            }}
        )
        
        return(
            //this view should give me assignments and quizzes in order of due date
            
            <div className='student-course-assignments'>
                <Header as='h2'>Upcoming Assignments/Quizzes</Header>
                <Table fixed columns={3}>
                    <Table.Header>
                        <Table.Row >
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Due Date</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {list}
                    </Table.Body>
                </Table>
                <Pagination
                    defaultActivePage={1}
                    totalPages={this.state.totalPages}
                    onPageChange={(event, data) => this.handlePage(data.activePage)}
                />
            </div>
        )
    }
}
export default StudentCourseAssignments