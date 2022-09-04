import { App } from '@aws-cdk/core';
import { QeetupCommon } from '../stack/cognito-common.stack';

const env = {
  region: 'eu-west-1',
};

const app = new App();

new QeetupCommon(app, 'QeetupCommon', {
  env,
  userPoolName: 'QeetupUsers-Dev',
  userPoolCognitoDomainPrefix: 'qeetup-example',
});
