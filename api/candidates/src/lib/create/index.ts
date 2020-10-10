import DynamoDb, {DocumentClient}  from 'aws-sdk/clients/dynamodb';
import { v4 as uuidv4 } from 'uuid';

interface Candidate {
  uuid: string,
  fullName: string,
  email: string,
  experience: string,
  submittedAt: number,
  updatedAt: number,
}

interface RequestCandidate {
  fullName: string,
  email: string,
  experience: string,
}

export default class CreateRepository {
  private dynamoTable: string;
  private dynamoDb: DynamoDb.DocumentClient;

  constructor() {
    this.dynamoTable = 'serverless-example';
    this.dynamoDb = new DynamoDb.DocumentClient({ region: 'us-west-2' });
  };

  public async createCandidate (params: RequestCandidate): Promise<string> {
    const { fullName, email, experience } = params;

    const { uuid } =  await this.submitCandidate(
      this.candidateInfo(fullName, email, experience)
    );

    return uuid;
  }

  private async submitCandidate (candidate: Candidate): Promise<Candidate>  {
    console.log('Submitting candidate');

    const candidateInfo: DocumentClient.PutItemInput = {
      TableName: this.dynamoTable,
      Item: candidate,
    };
    
    return this.dynamoDb
      .put(candidateInfo)
      .promise()
      .then(res => candidate);
  };
  
  private candidateInfo(fullname, email, experience): Candidate {
    const timestamp = new Date().getTime();

    return {
      uuid: uuidv4(),
      fullName: fullname,
      email: email,
      experience: experience,
      submittedAt: timestamp,
      updatedAt: timestamp,
    };
  };
}