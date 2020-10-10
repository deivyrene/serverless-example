import { SNSHandler } from 'aws-lambda';

// Own
//import UpdateScoringRepository from '../lib/update-scorting';

export const main: SNSHandler = async event => {

  const payload = JSON.parse(
    event.Records[0].Sns.Message,
  );
  
};
