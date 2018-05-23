import React, {Component} from 'react';
import {Header, Button, Modal, Icon, Table} from 'semantic-ui-react';
import axios from 'axios';
import FileUpload from './../../FileUpload'
import './StudentAssignmentDetail.css';
import { List } from 'material-ui';
import moment from 'moment';


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
                        :
                        <div>
                            
                            <FileUpload
                                cb = {url => uploadFileFn(url.Location, assignmentID, moment().format('YYYY-MM-DD'), this.closeModal() )}
                            />
                        </div>
                    }
                </div>
            </Modal.Content >
            {/* <Modal.Actions >
                <Button>
                    <Icon name='arrow left'/>Back
                </Button>
                <Button>
                   <Icon name='upload'/> Submit
                </Button>
            </Modal.Actions> */}
        </Modal>
        )
    }

}

export default StudentAssignmentDetail;