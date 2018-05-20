import React from 'react';
import { Segment, Header } from 'semantic-ui-react';

function ResourceGeneral(props){
    const {title} = props;
    return(
        <div>
            <Segment>
                <Header as='h2'>
                    {title}
                </Header>
            </Segment>
        </div>
    )
}
export default ResourceGeneral;