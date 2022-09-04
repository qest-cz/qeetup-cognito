import { CfnOutput, Construct, Stack, StackProps } from '@aws-cdk/core';
import { QeetupUsers } from '../constructs/qeetup-users';

export interface QeetupCommonProps extends StackProps {
  userPoolName: string;
  userPoolCognitoDomainPrefix: string;
}

export class QeetupCommon extends Stack {
  public constructor(scope: Construct, id: string, props: QeetupCommonProps) {
    super(scope, id, props);

    const { userPoolName, userPoolCognitoDomainPrefix } = props;

    const { userPool, userPoolClient } = new QeetupUsers(this, 'QeetupUsers', {
      userPoolName,
      userPoolCognitoDomainPrefix,
    });

    new CfnOutput(this, 'UserPoolId', { value: userPool.userPoolId });
    new CfnOutput(this, 'UserPoolClientId', {
      value: userPoolClient.userPoolClientId,
    });
  }
}
