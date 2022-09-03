// import path from 'path'
import { AccountRecovery, UserPool, UserPoolClient } from '@aws-cdk/aws-cognito'
import { Construct, Duration, RemovalPolicy } from '@aws-cdk/core'
import { Key } from '@aws-cdk/aws-kms'
import { Effect, ManagedPolicy, PolicyStatement } from '@aws-cdk/aws-iam'
// import { CustomNodejsFunction } from '../custom-nodejs-function.construct'

export interface QeetupUsersProps {
    removalPolicy: RemovalPolicy
    userPoolName?: string
    cognito_email_password: string
    cognito_reset_password_url: string
    cognito_invite_url: string
    base_url: string
    userPoolCognitoDomainPrefix: string
}

export class QeetupUsers extends Construct {
    public readonly userPool: UserPool
    public readonly userPoolClient: UserPoolClient
    public readonly senderKey: Key
    public readonly managementPolicy: ManagedPolicy

    public constructor(scope: Construct, id: string, props: QeetupUsersProps) {
        super(scope, id)

        const {
            userPoolName,
            removalPolicy,
        } = props

        const customSenderKmsKey = new Key(this, 'CognitoSenderKey', {
            removalPolicy,
            enableKeyRotation: false,
        })
        const userPool = new UserPool(this, 'UserPool', {
            removalPolicy,
            userPoolName,
            customSenderKmsKey,
            // autoVerify: {
            //     email: true,
            // },
            passwordPolicy: {
                minLength: 6,
                requireDigits: false,

                requireLowercase: false,
                requireSymbols: false,
                requireUppercase: false,

                tempPasswordValidity: Duration.days(90),
            },
            selfSignUpEnabled: true, // this should be enabled for sign-up flow
            signInAliases: {
                email: true,
                phone: false,
                username: false,
                preferredUsername: false,
            },
            accountRecovery: AccountRecovery.EMAIL_ONLY,
        })

        // userPool.addDomain('UserPoolDomain', {
        //     cognitoDomain: {
        //         domainPrefix: userPoolCognitoDomainPrefix,
        //     },
        // })

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
        userPoolClient.applyRemovalPolicy(RemovalPolicy.DESTROY)

        // const preSignUpTrigger = new CustomNodejsFunction(this, 'PreSignUpTrigger', {
        //     entry: path.join(__dirname, 'triggers', 'pre-sign-up.ts'),
        //     memorySize: 512,
        //     timeout: Duration.seconds(5),
        // })
        // const emailSender = new CustomNodejsFunction(this, 'EmailSenderTrigger', {
        //     entry: path.join(__dirname, 'triggers', 'email-sender.ts'),
        //     memorySize: 512,
        //     timeout: Duration.seconds(5),
        //     environment: {
        //         KMS_KEY_ID: customSenderKmsKey.keyArn,
        //     },
        // })
        // customSenderKmsKey.grantDecrypt(emailSender)

        // userPool.addTrigger(UserPoolOperation.CUSTOM_EMAIL_SENDER, emailSender)
        // userPool.addTrigger(UserPoolOperation.PRE_SIGN_UP, preSignUpTrigger)

        const managementPolicy = new ManagedPolicy(this, 'ManagementPolicy', {
            managedPolicyName: 'QeetupUsersManagement',
            statements: [
                new PolicyStatement({
                    actions: ['cognito-idp:*'],
                    effect: Effect.ALLOW,
                    resources: [userPool.userPoolArn],
                }),
            ],
        })

        this.userPool = userPool
        this.userPoolClient = userPoolClient
        this.senderKey = customSenderKmsKey
        this.managementPolicy = managementPolicy
    }
}
