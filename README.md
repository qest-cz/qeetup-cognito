# Qeetup cognito example app
AWS Cognito example for registration and login flow. Example contains Node.js and React App in NX monorepo.

## Prerequisites
Set AWS account

### Set your env. variables into .env file
``` 
NX_REGION=<AWS region>
NX_USER_POOL_ID=<AWS user pool id>
NX_USER_POOL_CLIENT_ID=<AWS user pool client id>
JWKS=<AWS JWKS>
```

### For JWKS get:
`curl https://cognito-idp.<AWS region>.amazonaws.com/<AWS user pool id>/.well-known/jwks.json`

## Install
`yarn install`

## Run backend
`yarn dev:backend`

## Run frontend
`yarn dev:frontend`

## Deploy cognito via AWS CDK
`yarn deploy`

