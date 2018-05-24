import React, {Component} from 'react';
import StudentAssignmentDetail from './../../StudentAssignmentDetail/StudentAssignmentDetail'
import { Table, Pagination } from 'semantic-ui-react';
import moment from 'moment';
class PendingAssignmentTable extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentPage:1,
            totalPages:Math.ceil(this.props.list.length/3),
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if (prevProps.list !== this.props.list){
            this.setState({
                totalPages:Math.ceil(this.props.list.length/3)
            })
        }
    }
    handlePage( pageIndex ){
        this.setState({
            currentPage:pageIndex
        })
    }
    render(){
        const { list, course } = this.props;
        const { currentPage, totalPages } = this.state;
        const assignments = list.map( (assignment, i) => {
            if (Math.ceil((i+1)/3)===currentPage){
                return (
                    <StudentAssignmentDetail
                        courseName = {assignment.course_name}
                        assignmentName = {assignment.name}
                        instructorName = {assignment.teacher_name}
                        dueDate = {moment(assignment.due_date).format('MM/DD')}
                        instructions = {assignment.description}
                        key = {`pend-assignment-detail${assignment.id}`}
                        uploadFileFn = {this.props.uploadFileFn}
                        assignmentID = {assignment.id}
                        studentID = {assignment.studentID}
                        attachment = {assignment.attachment}
                        dateSubmitted = {assignment.date_submitted}
                    />
                )
            }
        })
        return(
            <div>
                <Table striped color='brown' >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>{course}</Table.HeaderCell>
                            <Table.HeaderCell>Due Date</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {assignments}
                    </Table.Body>
                </Table>
                <Pagination
                defaultActivePage={1}
                totalPages={totalPages}
                onPageChange={(event, data) => this.handlePage(data.activePage)}/>
            </div>
        )
    }
}
export default PendingAssignmentTable