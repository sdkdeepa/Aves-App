import 'source-map-support/register'; 
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'; 
import { createLogger } from '../../utils/logger';
import { generateUploadUrl } from '../../businessLogic/imageLogic'; 

const logger = createLogger(`Generate Upload URL`); 

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info(`Processing event ${event}`); 

    // get imageId from event path parameters: 
    const imageId = event.pathParameters.imageId;

    // get pre-signed upload url based on imageId: 
    const uploadUrl = await generateUploadUrl(imageId);

    // return S3 upload URL: 
    return {
        statusCode: 200, 
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({ 
            uploadUrl, // get URL as string
        })
    }
}
