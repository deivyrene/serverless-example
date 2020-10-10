const AWS = require('aws-sdk');

const sns = new AWS.SNS({
  endpoint: 'http://127.0.0.1:3001',
  region: 'us-west-2',
});

sns.publish(
  {
    Message: JSON.stringify({ uuid: '139f1892-969c-43e9-b13a-376fcd34704b' }),
    TopicArn: `new-event`,
  },
  (error, response) => {
    console.log('publish response', error, response);
  },
);
