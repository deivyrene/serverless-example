import { APIGatewayProxyHandler } from 'aws-lambda';

// Own
import GetRepository from '../lib/get';

export const main: APIGatewayProxyHandler = async (event, context) => {
  const uuid = event.queryStringParameters?.uuid as string;

  const result = await new GetRepository().getCandidate({ uuid });
  
  const resultBuild = {success: true, candidate: result };
  
  const response = {
    statusCode: 200,
    body: JSON.stringify(resultBuild),
  };

  return response
};
