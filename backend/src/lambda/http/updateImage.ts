import 'source-map-support/register'; 
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'; 
import { UpdateImageRequest } from '../../req-interface/UpdateImageRequest'; 
import { updateImage } from '../../businessLogic/imageLogic'; 
import { createLogger } from '../../utils/logger'; 
import { getAuthorization } from '../../utils/getAuthorization'; 

const logger = createLogger('Update Image Item');

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info(`Process event: ${event}`); 

    // get image Id from request event
    // imageId as path parameters: 
    const imageId = event.pathParameters.imageId; 

    // get updated information from request body: 
    const updatedImage: UpdateImageRequest = JSON.parse(event.body); 

    // validate user
    const userId = getAuthorization(event); 

    // update image item: 
    await updateImage(userId, imageId, updatedImage); 

    return {
        statusCode: 200, 
        body: 'Update success',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        }
    }
}