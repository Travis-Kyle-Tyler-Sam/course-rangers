import React from 'react';
import { Table, Header } from 'semantic-ui-react';
import moment from 'moment';
function StudentCourseResources (props){
    
    const { resources } = props;
    const list = resources.map( resource => {
        return(
            <Table.Row>  
            <Table.Cell><a target='_blank' href={resource.url}>{resource.title}</a></Table.Cell>
            <Table.Cell>{moment(resource.date).format('MM/DD')}</Table.Cell>
       </Table.Row>
        )
    })
    return(
        <div>
            <Header as='h2'>Resources</Header>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Resource</Table.HeaderCell>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {list}
                </Table.Body>
            </Table>
        </div>
    )
}
export default StudentCourseResources;