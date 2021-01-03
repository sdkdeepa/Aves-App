import * as React from 'react'; 
import { Form, Button } from 'semantic-ui-react'; 
import Auth from '../auth/Auth'; 
import { History } from 'history'; 
import { updateImage } from '../api/images-api'; 

enum UploadState {
    NoUpload, 
    UpdatingData
}

interface EditImageProps {
    history: History,
    auth: Auth ,
    match: {
        params: {
            imageId: string
        }
    }
}

interface EditImageState {
    description: string, 
    uploadState: UploadState
}

const EditImage: React.FC<EditImageProps> = (props) => {

    const [description, setDescription] = React.useState<EditImageState['description']>('');
    const [uploadState, setUploadState] = React.useState<EditImageState['uploadState']>(UploadState.NoUpload); 

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value); 
    };

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault(); 

        try {
            if (description === '' || !description) {
                alert('Description should be selected'); 
                return; 
            }

            setUploadState(UploadState.UpdatingData); 
            await updateImage(props.auth.getIdToken(), props.match.params.imageId, {
                description
            })

            alert('Data updated!');
            
            // use history goBack() to fix unmounting React error: 
            props.history.goBack(); 

        } catch (e) {
            alert('Could not update data: ' + e.message); 
        } finally {
            // reset UploadState to NoUpload: 
            setUploadState(UploadState.NoUpload); 
        }
    };

    const renderButton = () => {
        return (
            <div>
                {uploadState === UploadState.UpdatingData
                    && <p>Updating new description</p>
                }
                <Button 
                    loading={uploadState !== UploadState.NoUpload}
                    type='submit'
                >
                    Update
                </Button>
            </div>
        )
    }

    return (
        <div>
            <h1>Edit Image</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>New Description</label>
                    <input 
                        placeholder='New Description'
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </Form.Field>
                {renderButton()}
            </Form>
        </div>
    )
};

export default EditImage; 