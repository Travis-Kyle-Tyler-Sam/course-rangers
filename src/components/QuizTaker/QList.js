import React, { Component } from 'react';
import { Icon, Segment, Header } from 'semantic-ui-react'


class QList extends Component {
    constructor(props) {
        super(props);
        this.state = { 

         }
    }

    render() { 

        let questions = this.props.questions.map( (question, i) => <div key={question.id}> <Icon name='circle outline' color='red' /> Question {i+1} </div>)

        return ( 
                <Segment 
                    className='qlist-container'
                    style={{margin: 0}} >
                    <Header>Questions</Header>
                    { questions }
                    { questions }
                    { questions }
                    { questions }
                    { questions }
                    { questions }
                    { questions }
                    { questions }
                    { questions }
                    { questions }
                    { questions }
                    { questions }
                    { questions }
                    { questions }
                    { questions }
                    { questions }
                </Segment>
         )
    }
}
 
export default QList;