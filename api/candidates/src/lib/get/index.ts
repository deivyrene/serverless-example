import DynamoDb, {DocumentClient}  from 'aws-sdk/clients/dynamodb';
import { v4 as uuidv4 } from 'uuid';

interface Candidate {
  uuid: string,
  fullname: string,
  email: string,
  experience: string,
  submittedAt: number,
  updatedAt: number,
}

interface RequestCandidate {
  uuid: string;
}

export default class GetRepository {
  private dynamoTable: string;
  private dynamoDb: DynamoDb.DocumentClient;

  constructor() {
    this.dynamoTable = 'serverless-example';
    this.dynamoDb = new DynamoDb.DocumentClient({ region: 'us-west-2' });
  };

  public async getCandidate (params: RequestCandidate): Promise<Candidate> {
    const { uuid } = params;

    const candidate = await this.performCandidate(uuid) as DocumentClient.ItemResponse;

    return candidate.Item as Candidate;
  }

  private async performCandidate (uuid: string): Promise<DocumentClient.ItemResponse | void>  {
    console.log('Get candidate');

    const candidateInfo: DocumentClient.GetItemInput = {
      TableName: this.dynamoTable,
      Key: {
        uuid: uuid,
      },
    };
    
    return this.dynamoDb.get(candidateInfo).promise();
  };
}