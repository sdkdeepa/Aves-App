import * as uuid from 'uuid'; 
import { createLogger } from '../utils/logger'; 
import { ImageItem } from '../model-interface/ImageItem'; 
import { AccessLayer } from '../dataLayer/accessLayer'; 
import { parseUserId } from '../utils/parseUserId'; 
import { CreateImageRequest } from '../req-interface/CreateImageRequest'; 
import * as moment from 'moment-timezone'; 
import { UpdateImageRequest } from '../req-interface/UpdateImageRequest'; 

const logger = createLogger('imageLogic.ts'); 

const accessLayer = new AccessLayer(); 

// query all images from the given JWT token
// return an array of images:
export async function getAllImages(jwtToken: string): Promise<ImageItem[]> {
    logger.info('get images in imageLogic.ts'); 

    const userId = parseUserId(jwtToken); 
    logger.info(`userId: ${userId} `); 
    
    return await accessLayer.getImages(userId); 
}

// create new image with corresponding userId 
// return the newly created ImageItem
export async function createImage(
    jwtToken: string,
    newImage: CreateImageRequest
): Promise<ImageItem> {

    logger.info(`Insert new image`); 

    // create a uniqe imageId and get userID
    const imageId = uuid.v4(); // generate unique image id: 
    const userId = parseUserId(jwtToken); 
    // format time using Moment.js: 
    const currentTime = moment().tz("America/Los_Angeles").format("MMM DD, YYYY hh:mm:ss a"); 

    logger.info(`Create image for user ${userId}`); 

    // pass imageId, userId and createdAt
    return await accessLayer.createImage({
        userId, 
        imageId, 
        createdAt: currentTime, 
        ...newImage, // description
    }) as ImageItem;  
}

// update an image item based on userId and imageId: 
export async function updateImage(
    jwtToken: string, 
    imageId: string, 
    updateImage: UpdateImageRequest,
) {
    logger.info(`Update Image: ${imageId}`); 
    await accessLayer.updateImage(parseUserId(jwtToken), imageId, updateImage); 
}

// delete an image based on userId and imageId: 
export async function deleteImage(
    jwtToken: string, 
    imageId: string, 
) {
    logger.info(`Delete image: ${imageId}`)
    await accessLayer.deleteImage(parseUserId(jwtToken), imageId); 
}

// get pre-signed S3 URL: 
export async function generateUploadUrl(imageId: string): Promise<string> {
    logger.info(`Get S3 pre-signed url: `);

    return await accessLayer.generateUploadUrl(imageId); 
}