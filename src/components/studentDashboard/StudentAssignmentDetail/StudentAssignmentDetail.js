import React, {Component} from 'react';
import {Header, Button, Modal, Icon, Table} from 'semantic-ui-react';
import axios from 'axios';
import FileUpload from './../../FileUpload'
import './StudentAssignmentDetail.css';
import { List } from 'material-ui';
import moment from 'moment';
import Dropzone from 'react-dropzone';

class StudentAssignmentDetail extends Component{
    constructor(){
        super();
        this.state = {
            modalOpen:false,
            courseName:'Math',
            assignmentName:'Fractions',
            instructorName:'Billie the Kid',
            dueDate:'Friday',
            instructions: 'These are some instructions that would instruct people on how to instruct other people.', 
            // courseAssignmentID:73,
            // pointsPossible:50,
            // pointScored:30,
            // dateSubmitted:new Date()
        }
    }

    compoonentDidMount(){
        //should get courseAssignmentid from props--either that or we'll get the student id and assignmentid, which we can then use. I've currently got it set up to find the assignment based on the courseAssignmentID. I think the modal should be able to get the assignmentName, instructor, and courseName, from props
        // const {courseAssignmentID} = this.state;
        // axios.get(`/api/assignment/${courseAssignmentID}`).then( assignment => {
        //     this.setState({
        //         instructions:assignment.data.description,
        //         dueDate:assignment.data.due_date,
        //         pointsPossible:assignment.data.points_possible,
        //         pointsScored:assignment.data.point_scored,
        //         dateSubmitted:assignment.data.date_submitted,
        //         courseName:assignment.data.name
        //     })
        // })
    }
    onDrop = (acceptedFiles) => {
        
    }
    render(){
        const { courseName, assignmentName, instructorName, dueDate, 
            instructions, status, uploadFileFn, assignmentID, studentID, 
            attachment, dateSubmitted  } = this.props;
        return(
        <Modal trigger={
            <Table.Row>
                <Table.Cell>{assignmentName}</Table.Cell>
                <Table.Cell>{dueDate}</Table.Cell>
                {dateSubmitted
                ?<Table.Cell>{`submitted ${moment(dateSubmitted).format('MM/DD')}`}</Table.Cell>
                :<Table.Cell>Incomplete</Table.Cell>
                }
            </Table.Row>
            } 
            closeIcon 
            size='mini'>
            <Modal.Header>{courseName}: {assignmentName}</Modal.Header>
            <Modal.Content className='content' >
                <div className='content'>
                    <p>Instructor: {instructorName}</p><br/>
                    <p>Due: {dueDate}</p><br/>
                    <p>Instructions:</p><br/>
                    <p>{instructions}</p>
                    {
                        attachment
                        ? <div>
                            <p>Attachment:</p>
                            <a href={attachment} target={'_blank'}><img src = {attachment} style={{height:'100px', width:'100px'}}/></a>
                        </div>
                        :<FileUpload
                            cb = {url => uploadFileFn(url.Location, assignmentID, moment().format('YYYY-MM-DD') )}
                        />
                    }
                </div>
            </Modal.Content >
            <Modal.Actions >
                <Button>
                    <Icon name='arrow left'/>Back
                </Button>
                <Button>
                   <Icon name='upload'/> Submit
                </Button>
            </Modal.Actions>
        </Modal>
        )
    }

}

export default StudentAssignmentDetail;