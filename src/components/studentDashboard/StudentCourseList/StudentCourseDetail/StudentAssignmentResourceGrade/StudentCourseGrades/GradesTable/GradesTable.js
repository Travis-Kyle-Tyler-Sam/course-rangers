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
        return(
            <div className='grades-table'>
                
                <Table fixed compact singeLine columns={3} color='orange'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>{this.props.singular}</Table.HeaderCell>
                            <Table.HeaderCell>Score</Table.HeaderCell>
                            <Table.HeaderCell>Grade</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.props.list}
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