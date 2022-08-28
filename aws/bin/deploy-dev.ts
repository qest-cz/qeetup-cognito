import { App, RemovalPolicy, Tags } from '@aws-cdk/core'
// import { Accounts } from '../constants/accounts'
import { QeetupCommon } from '../stack/cognito-common.stack'

const env = {
    // account: Accounts.Dev,
    region: 'eu-west-1',
}

const app = new App()

const cognito_email_password = process.env.COGNITO_EMAIL_PASSWORD ?? ''

// if (!cognito_email_password) throw Error('Not set COGNITO_EMAIL_PASSWORD env')

const common = new QeetupCommon(app, 'QeetupCommon', {
    env,
    removalPolicy: RemovalPolicy.RETAIN,
    userPoolName: 'QeetupUsers-Dev',
    cognito_email_password,
    cognito_invite_url: 'https://dev.qeetup.qest.cz/vytvoreni-hesla',
    cognito_reset_password_url: 'https://dev.qeetup.qest.cz/obnova-hesla',
    base_url: 'https://dev.qeetup.qest.cz',
    userPoolCognitoDomainPrefix: 'dev-qeetup-qest',
})

Tags.of(app).add('EnvironmentName', 'dev')
Tags.of(app).add('ProjectName', 'Qeetup')

Tags.of(common).add('ServiceName', 'QeetupCommon')
