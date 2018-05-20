import React from 'react';
import { Table, Header } from 'semantic-ui-react';

function GradesTable(props){
    
    return(
        <div>
            <Header as='h3'>{props.type}</Header>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>{props.singular}</Table.HeaderCell>
                        <Table.HeaderCell>Score</Table.HeaderCell>
                        <Table.HeaderCell>Grade</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {props.list}
                </Table.Body>
            </Table>
        </div>
    )
}
export default GradesTable;