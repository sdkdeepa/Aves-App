import 'source-map-support/register'; 
import { createLogger } from '../../utils/logger'; 
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'; 
import { getAllImages } from '../../businessLogic/imageLogic'; 
import { getAuthorization } from '../../utils/getAuthorization';
// import * as middy from 'middy'; 
// import { cors } from 'middy/middlewares'; 

const logger = createLogger('Get All Images'); 

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info('Processing event: ', event); 

    // authorize with JWT from event headers
    // const authorization = event.headers.Authorization; 
    // const jwtToken = authorization.split(' ')[1]; 

    const jwtToken = getAuthorization(event);  
    
    logger.info('jwt token ', jwtToken); 

    // get all images: 
    const images = await getAllImages(jwtToken); 

    logger.info(`Images list: ${images}`); 

    return {
        statusCode: 200, 
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({
            items: images, 
        })
    }
}; 