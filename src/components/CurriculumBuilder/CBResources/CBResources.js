import React, { Component } from 'react';
import { Card, Icon, Image, Input, Button, TextArea, Form, Header, Checkbox } from 'semantic-ui-react'
import FileUpload from '../../FileUpload'
import '../CurriculumBuilder.css'


class CBResources extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            resourceTitleInput: '',
            resourceDescriptionInput: '',
            resourceTypeLink: true,
            resourceLinkInput: '',
            resourceFileInput: '',
        }
    }
    
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleResourceType = (e, { value }) => this.setState({ resourceTypeLink: value })

    resourceSave = () => {
        let { resourceTitleInput, resourceDescriptionInput, resourceTypeLink, resourceLinkInput, resourceFileInput } = this.state ;
        let { assignments, dayDesc, dayNum, dayTopic, quizzes, resources } = this.props.selectedDay ;
        let resourceType = resourceTypeLink ? 'link' : 'file';
        let resourceUrl = resourceTypeLink ? resourceLinkInput : resourceFileInput ;

        if(resourceTitleInput !== '' && resourceDescriptionInput !== '' && resourceUrl !== '') {

            let newResource = {
                title: resourceTitleInput,
                description: resourceDescriptionInput,
                type: resourceType,
                url: resourceUrl
            }

            let updatedResources = [...resources, newResource ]
            let sendDay = {
                dayNum,
                assignments,
                resources: updatedResources,
                quizzes,
                dayTopic,
                dayDesc
            }
            this.props.updateDay( sendDay )
            this.props.switch(0)
        }
    }
    

    uploadedFile = (awsResponse) => {
        this.setState({
            resourceFileInput: awsResponse.Location
        })
    }

    render() { 

        let daySaveLabel = this.state.editingTopicDesc ? 'Save' : 'Edit'

        return ( 
        <div className="ui segment cb-pane" style={ { margin: 10 } }>
             <Header>
                 Add a Resource
             </Header>
                 <Form>
                 <Input name='resourceTitleInput' value={this.state.resourceTitleInput} onChange={this.handleInput} placeholder='Title' fluid />
                     <TextArea name='resourceDescriptionInput' value={this.state.resourceDescriptionInput} onChange={this.handleInput} placeholder='Description' fluid />
                     <div className='cb-resource-radios'>
         
                     <Form.Field>
                     <Checkbox
                         radio
                         label='Link'
                         name='resourceTypeLink'
                         value={ true }
                         checked={ this.state.resourceTypeLink }
                         onChange={ this.handleResourceType }
                         />
                     </Form.Field>
                     <Form.Field>
                     <Checkbox
                         radio
                         label='Upload'
                         name='resourceTypeUpload'
                         value={ false }
                         checked={ !this.state.resourceTypeLink }
                         onChange={ this.handleResourceType }
                         />
                     </Form.Field>
                     </div>
                     { ! this.state.resourceTypeLink && <div>
                         <FileUpload 
                             cb={ this.uploadedFile } />
                         { this.state.resourceFileInput !== '' && <img src={ this.state.resourceFileInput } width='50px' />  }
                     </div> 
                     }
                     { this.state.resourceTypeLink && 
                     <div>
                         <Input name='resourceLinkInput' value={ this.state.resourceLinkInput } onChange={ this.handleInput } placeholder='Link to Resource' fluid />
         
                     </div>
                     }
                    
                 </Form>
             <Button 
                 primary={ true } 
                 style={{float: 'right'}}
                 onClick={ this.resourceSave } >
                 Add Resource
             </Button>
        </div>
        )
    }
}
 
export default CBResources;

