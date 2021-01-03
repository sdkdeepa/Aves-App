import 'source-map-support/register'; 
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda';
import { createLogger } from '../../utils/logger'; 
import { deleteImage } from '../../businessLogic/imageLogic';
import { getAuthorization } from '../../utils/getAuthorization'; 

const logger = createLogger('Delete Image Item'); 

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info(`Processign event: ${event}`); 

    // get imageId from event path parameter:
    const imageId = event.pathParameters.imageId; 

    // get userId JWT token: 
    // const userId = event.headers.Authorization.split(' ')[1]; 
    const userId = getAuthorization(event);

    // delete image based on userId and imageId: 
    await deleteImage(userId, imageId); 

    return {
        statusCode: 200, 
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        },
        body: 'Success deleted',
    }
}