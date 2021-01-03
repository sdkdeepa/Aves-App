import React from 'react'; 
import { Dimmer, Loader } from 'semantic-ui-react'; 

const CallBack = () => {
    return (
        <Dimmer active>
            <Loader content='Loading'/>
        </Dimmer>
    )
}

export default CallBack; 