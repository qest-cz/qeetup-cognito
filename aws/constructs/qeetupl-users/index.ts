// import path from 'path'
import { UserPool, UserPoolClient, VerificationEmailStyle } from '@aws-cdk/aws-cognito'
import { Construct } from '@aws-cdk/core'
import { Key } from '@aws-cdk/aws-kms'
import { ManagedPolicy } from '@aws-cdk/aws-iam'

export interface QeetupUsersProps {
    userPoolName: string
    userPoolCognitoDomainPrefix: string
}

export class QeetupUsers extends Construct {
    public readonly userPool: UserPool
    public readonly userPoolClient: UserPoolClient
    public readonly senderKey: Key
    public readonly managementPolicy: ManagedPolicy

    public constructor(scope: Construct, id: string, { userPoolName, userPoolCognitoDomainPrefix }: QeetupUsersProps) {
        super(scope, id)

        const userPool = new UserPool(this, 'UserPool', {
            userPoolName,
            selfSignUpEnabled: true,
            signInAliases: {
                email: true,
            },
            userVerification: {
                emailSubject: 'Verify your email for our awesome app!',
                emailBody: 'Thanks for signing up to our awesome app! {##Verify Email##}',
                emailStyle: VerificationEmailStyle.LINK,
            },
        })

        userPool.addDomain('UserPoolDomain', {
            cognitoDomain: {
                domainPrefix: userPoolCognitoDomainPrefix,
            },
        })

        const userPoolClient = new UserPoolClient(this, 'AdminUserPoolClient', {
            userPool,
            generateSecret: false,
            userPoolClientName: 'WebClient',
            authFlows: {
                adminUserPassword: true,
                userPassword: true,
                userSrp: true,
            },
        })

        this.userPool = userPool
        this.userPoolClient = userPoolClient
    }
}
