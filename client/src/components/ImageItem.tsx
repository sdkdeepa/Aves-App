import * as React from 'react'; 
import { Card, Image, Icon, Divider, Button } from 'semantic-ui-react'; 
import ImageModel from '../type-interfaces/ImageModel'; 
import { deleteImage } from '../api/images-api';
import Auth from '../auth/Auth'; 

interface ImageCardProps {
    image: ImageModel, 
    auth: Auth, 
}; 

const ImageItem: React.FC<ImageCardProps> = ({ image, auth }) => {

    async function handleOnDelete(imageId: string) {
        await deleteImage(auth.getIdToken(), imageId); 
        alert(`Deleted`);
    }; 

    React.useEffect(() => {
        // call deleteImage()
        try {
            handleOnDelete(image.imageId)
        } catch(e) {
            alert(`Failed to delete item: ${e.message}`); 
        }
    }, [auth]);

    return (
        <Card>
            <Card.Content>
                <div>
                    <Icon floated="left" avatar="true" size="large" name='user circle outline' />
                    <span>{image.userId?.substring(14)}</span>
                </div>
                {image.imageUrl && (
                    <Image src={image.imageUrl} size="big" bordered/>
                )}
                <Divider clearing />
                <Card.Header>{image.description}</Card.Header>
                <Icon name='history'/>{image.createdAt}
            </Card.Content>

            <Card.Content extra>
                <div>
                    <Button 
                        basic 
                        color="black"
                        buttonStyle={{backgroundColor: 'blue'}}
                    >
                        Edit
                    </Button>
                    <Button 
                        basic 
                        color="black"
                        buttonStyle={{backgroundColor: 'red'}}
                        onClick={() => handleOnDelete(image.imageId)}
                    >
                        Delete
                    </Button>
                </div>
            </Card.Content>
        </Card>
    )
}; 

export default ImageItem; 