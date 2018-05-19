import React from 'react';
import { Button, Input, Form, Icon, Label, List, Loader, Segment, Breadcrumb, Grid, Transition, TextArea,  Header} from 'semantic-ui-react';

function Survey (props){
    const { thumbsVisible, buttonArray, handleButtonPress} = props;
    return(
        <div>
            <Transition duration='500' animation='fly left' visible={thumbsVisible}>
                <Form>
                    <p>{teacherThumbText}</p>
                        <Icon name='thumbs outline up' size='large'/>
                    <Button onClick={this.buttonPress} 
                        disabled={thumbsDisable}
                        >
                        I get it!
                    </Button>
                        <Icon name='thumbs outline down' size='large'/>
                    <Button onClick={this.buttonPress2}
                        disabled={thumbsDisable}
                        >
                        I don't get it.
                    </Button>
                </Form>
            </Transition>
                            
            { !studentUnderstands
            ?<Form>
                <p>What don't you understand?</p>
                <TextArea onChange={this.handleInput} name='studentsurveyinput' value={studentsurveyinput}/>
                <Button onClick={this.sendStudentResponse}>This is my question</Button>
                <p>{studentSurveyText}</p>
            </Form>
            : null
            }
        </div>
    )
}

export default Survey