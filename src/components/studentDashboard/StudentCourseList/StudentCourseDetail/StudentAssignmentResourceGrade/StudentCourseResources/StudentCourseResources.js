import React from 'react';
import { Table, Header } from 'semantic-ui-react';

function StudentCourseResources (props){
    //resources will come from props
    const resources = [{name:'resourceA',date:'Friday'}, {name:'resourceB',date:'Friday'},{name:'resourceC',date:'Friday'},]
    const list = resources.map( resource => {
        return(
        <Table.Row>
            <Table.Cell>{resource.name}</Table.Cell>
            <Table.Cell>{resource.date}</Table.Cell>
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