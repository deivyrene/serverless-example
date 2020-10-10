import { SNSHandler } from 'aws-lambda';

// Own
import UpdateScoringRepository from '../lib/update-scoring';

export const main: SNSHandler = async event => {

  const payload = JSON.parse(
    event.Records[0].Sns.Message,
  );

  console.log(payload);
  
  const result = await new UpdateScoringRepository().updateCantidate(payload.uuid);
  
  console.log(result);
};
