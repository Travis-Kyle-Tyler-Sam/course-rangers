import React, {Component} from 'react';
import { Button, Modal, Table} from 'semantic-ui-react';
import FileUpload from './../../FileUpload'
import './StudentAssignmentDetail.css';
import moment from 'moment';


class StudentAssignmentDetail extends Component{

    render(){
        const { courseName, assignmentName, instructorName, dueDate, 
            instructions, uploadFileFn, assignmentID, 
            attachment } = this.props;
        return(
        <Modal trigger={
            <Table.Cell>
                <Button>
                    View
                </Button>
            </Table.Cell>
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
                            <a href={attachment} target={'_blank'}><img src = {attachment} alt='document' style={{height:'100px', width:'100px'}}/></a>
                        </div>
                        :
                        <div>
                            
                            <FileUpload
                                cb = {url => uploadFileFn(url.Location, assignmentID, moment().format('YYYY-MM-DD'))}
                            />
                        </div>
                    }
                </div>
            </Modal.Content >
        </Modal>
        )
    }

}

export default StudentAssignmentDetail;