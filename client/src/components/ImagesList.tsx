import * as React from 'react'; 
import ImageModel   from '../type-interfaces/ImageModel'; 
import { Card, Divider, Button, Grid, Image, Icon } from 'semantic-ui-react'; 
import { History } from 'history'; 
// import ImageItem from './ImageItem';
import Auth from '../auth/Auth';
import { getImages, deleteImage } from '../api/images-api'; 

interface ImagesListProps {
    history: History, 
    auth: Auth,
}; 

const ImagesList: React.FC<ImagesListProps> = ({ history, auth }) => {

    // all states: 
    const [images, setImages] = React.useState<ImageModel[]>([]); 

    // Go to Upload bird Image page on click event:
    const handleCreateImage = () => {
        history.push(`/images/create`); 
    }; 

    // Go to Edit Image page on click event: 
    const onEditButtonClick = (imageId: string) => {
        history.push(`/images/${imageId}`);
    }

    // GET all images in homepage: 
    React.useEffect(() => {
        // use async/await to display all images using getImages(): 
        async function getAllImages() {
            const images = await getImages(auth.getIdToken()); 
            setImages(images); 
        }
        try {
            getAllImages(); 
        } catch(e) {
            alert(`Failed to fetch images ${e.message}`); 
        }
    }, [auth]); 

    // set state of images to images not being deleted: 
    const setNewImageList = (imageId: string) => {
        const newImages = images.filter((image) => image.imageId !== imageId);
        setImages(newImages);  
    }

    // DELETE image:
    async function handleDeleteImage(imageId: string) {
        try {
            alert(`Image deleted!`);
            await deleteImage(auth.getIdToken(), imageId);  // call deleteImage():
            setNewImageList(imageId); 
        } catch (e) {
            alert(`Failed to delete image ${e.message}`); 
        }
    }

    return (
        <div>
            {/* Button to Upload Bird Image */}
            <Button
                primary
                size='huge'
                className='add-button'
                onClick={handleCreateImage}
            >
                Upload Bird Image 
            </Button>

            <Divider clearing />

            <Grid centered columns={2}>
                <Grid.Column>
                {/* Display Images */}
                <Card.Group itemsPerRow={1}>
                    {images.map(image => {
                        // return <ImageItem key={image.imageId} image={image} auth={auth}/>
                        return (
                            <Card key={image.imageId}>
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
                                            class="ui blue button"
                                            basic 
                                            color="blue"
                                            onClick={() => onEditButtonClick(image.imageId)}
                                        > Edit </Button>
                                        <Button 
                                            basic 
                                            color="red"
                                            onClick={() => handleDeleteImage(image.imageId)}
                                        > Delete </Button>
                                    </div>
                                </Card.Content>
                            </Card>
                    )})}
                </Card.Group>
                </Grid.Column>
            </Grid>
        </div>
    )
}; 

export default ImagesList; 