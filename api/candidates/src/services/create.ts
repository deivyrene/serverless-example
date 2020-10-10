import { APIGatewayProxyHandler } from 'aws-lambda';

// Own
import CreateRepository from '../lib/create';

export const main: APIGatewayProxyHandler = async (event, context) => {
  const params = JSON.parse(event.body as string);

  const result = await new CreateRepository().createCandidate(params);
  
  console.log(result);
  
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      uuid: result
    }),
  };

  return response;
};
