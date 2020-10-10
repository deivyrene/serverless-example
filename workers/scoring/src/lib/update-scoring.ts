import DynamoDb, {DocumentClient}  from 'aws-sdk/clients/dynamodb';

interface Candidate {
  uuid: string,
  fullname: string,
  email: string,
  experience: string,
  submittedAt: number,
  updatedAt: number,
}

export default class UpdateScoringRepository {
  private dynamoTable: string;
  private dynamoDb: DynamoDb.DocumentClient;

  constructor() {
    this.dynamoTable = 'serverless-example';
    this.dynamoDb = new DynamoDb.DocumentClient({ region: 'us-west-2' });
  };

  public async updateCantidate (uuid: string): Promise<boolean> {

     await this.performCandidate(uuid) as DocumentClient.ItemResponse;

     return true;
  }

  private async performCandidate (uuid: string): Promise<DocumentClient.ItemResponse | void>  {
    console.log('Update candidate');

    const options: DocumentClient.UpdateItemInput = {
      TableName: this.dynamoTable,
      ReturnValues: 'NONE',
      ExpressionAttributeValues: {
        ':experience': 'Otra',
      },
      UpdateExpression: 'SET experience = :experience',
      Key: {
        uuid: uuid,
      },
    };
    
    return this.dynamoDb.update(options).promise().then(res => console.log('performCandidate', res)
    );
  };
}