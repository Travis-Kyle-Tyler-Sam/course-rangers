import React, { Component } from 'react';
import { Table, Pagination } from 'semantic-ui-react';
import '../../../StudentCourseDetail.css'
class GradesTable extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentPage:1,
            totalPages:Math.ceil(this.props.list.length/5)
        }
    }
    
    render(){
        const displayedList = this.props.list.map( assignment => {
            return(
                <Table.Row key={assignment.id}>
                    <Table.Cell>{assignment.name}</Table.Cell>
                    <Table.Cell>{
                        assignment.point_scored
                        ?`${assignment.point_scored}/${assignment.points_possible}`
                        : 'Not yet graded'
                        }</Table.Cell>
                    <Table.Cell>{
                        assignment.percentage
                        ?`${assignment.percentage}%`
                        : 'Not yet graded'
                        }</Table.Cell>
                </Table.Row>
            )
        })
        return(
            <div className='grades-table'>
                
                <Table fixed compact columns={3} color='orange'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>{this.props.singular}</Table.HeaderCell>
                            <Table.HeaderCell>Score</Table.HeaderCell>
                            <Table.HeaderCell>Grade</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {displayedList}
                    </Table.Body>
                </Table>
                <Pagination
                    style={{ margin: '15px 0'}}
                    defaultActivePage={1}
                    totalPages={this.state.totalPages}
                    onPageChange={(event, data) => this.handlePage(data.activePage)}
                />
            </div>
        )
    }
}
export default GradesTable;