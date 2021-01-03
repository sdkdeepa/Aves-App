import * as React from 'react'; 
import { Form, Button } from 'semantic-ui-react';
import { createImage, getUploadUrl, uploadFile } from '../api/images-api';
import Auth from '../auth/Auth'; 
import { History } from 'history'; 

enum UploadState {
    NoUpload,
    UploadingData,
    FetchingPresignedUrl,
    UploadingFile
}  

interface CreateImageProps {
    history: History,
    auth: Auth
}

interface CreateImageState {
    description: string, 
    file: any, 
    uploadState: UploadState
}

const CreateImage: React.FC<CreateImageProps> = ({ history, auth }) => {

    const [description, setDescription] = React.useState<CreateImageState['description']>(''); 
    const [file, setFile] = React.useState<CreateImageState['file']>(undefined); 
    const [uploadState, setUploadState] = React.useState<CreateImageState['uploadState']>(UploadState.NoUpload); 

    // handle input change of description: 
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value); 
    }; 

    // hangle file change:
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files; 

        if (!files) { return; }

        setFile(files[0]); 
    }; 

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault(); 

        try {
            if (!file) {
                alert('File should be selected'); 
                return; 
            }

            if (description === '' || !description) {
                alert('Description needed');
                return; 
            }

            // set UpdateState to Uploading Data: 
            setUploadState(UploadState.UploadingData); 
            // create new image with new 'description': 
            const uploadInfo = await createImage(auth.getIdToken(), {
                description: description,
            });

            // set UpdateState to Fetching Presigned Url: 
            setUploadState(UploadState.FetchingPresignedUrl);
            // get S3 presigned url using getUploadUrl(): 
            const uploadUrl =  await getUploadUrl(auth.getIdToken(), uploadInfo.imageId);

            // set UploadState to UploadingFile: 
            setUploadState(UploadState.UploadingFile); 
            // upload file to S3 bucket using Presigned-URL:
            await uploadFile(uploadUrl, file); 

            alert('File successfully uploaded!'); 

            // use history goBack() to fix unmounting React error: 
            history.goBack();             
        } catch(e) {
            alert('Could not upload an image: ' + e.message); 
        } finally {
            // reset UploadState to NoUpload: 
            setUploadState(UploadState.NoUpload); 
        }
    }


    const renderButton = () => {
        return (
            <div>
                {uploadState === UploadState.UploadingData
                    && <p>Upload new description</p>
                }
                {uploadState === UploadState.FetchingPresignedUrl 
                    && <p>Uploading image metadata</p>
                }
                {uploadState === UploadState.UploadingFile
                    && <p>Uploading file</p>
                }
                <Button
                    loading={uploadState !== UploadState.NoUpload}
                    type="submit"
                >
                    Upload
                </Button>
            </div>
        )
    }; 

    return (
        <div>
            <h1>Upload Bird Image</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Description</label>
                    <input 
                        placeholder="Image Description"
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Image</label>
                    <input 
                        type="file"
                        accept="image/*"
                        placeholder="Image to upload"
                        onChange={handleFileChange}
                    />
                </Form.Field>
                {renderButton()}
            </Form>
        </div>
    ); 
}; 

export default CreateImage; 