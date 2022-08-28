import { CfnOutput, Construct, RemovalPolicy, Stack, StackProps } from '@aws-cdk/core'
import { QeetupUsers } from '../constructs/qeetupl-users'

export interface QeetupCommonProps extends StackProps {
    userPoolName: string
    removalPolicy: RemovalPolicy
    cognito_email_password: string
    cognito_reset_password_url: string
    cognito_invite_url: string
    base_url: string
    userPoolCognitoDomainPrefix: string
}

export class QeetupCommon extends Stack {
    public constructor(scope: Construct, id: string, props: QeetupCommonProps) {
        super(scope, id, props)

        const {
            userPoolName,
            removalPolicy,
            cognito_email_password,
            cognito_reset_password_url,
            cognito_invite_url,
            base_url,
            userPoolCognitoDomainPrefix,
        } = props

        const { userPool, userPoolClient } = new QeetupUsers(this, 'QeetupUsers', {
            userPoolName,
            removalPolicy,
            cognito_email_password,
            cognito_reset_password_url,
            cognito_invite_url,
            base_url,
            userPoolCognitoDomainPrefix,
        })

        new CfnOutput(this, 'UserPoolId', { value: userPool.userPoolId })
        new CfnOutput(this, 'UserPoolClientId', { value: userPoolClient.userPoolClientId })
    }
}
