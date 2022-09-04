import * as jwt from 'jsonwebtoken';
import * as jwkToPem from 'jwk-to-pem';

export type JsonWebKey = {
    keys: {
        alg: string;
        e: string;
        kid: string;
        kty: string;
        n: string;
        use: string;
    }[]
};

export const verifyUser = (req, res, next) => {
    try {
        const authorization = req?.headers.authorization
        const authHeaderParts = authorization?.split(' ');
        const token = authHeaderParts && authHeaderParts.length === 2 && authHeaderParts[0] === 'Bearer' ? authHeaderParts[1] : null;

        const jwk = JSON.parse(process.env.JWKS)
        verifyToken(token, jwk)

        next()
    } catch (err) {
        throw new VerificationFailedError(err.message);
    }
}

// NOTE: doc - https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html
export const verifyToken = (idToken: string, jwks: JsonWebKey) => {
    const decodedJwtToken = jwt.decode(idToken, { complete: true });

    const jwk = jwks.keys.find((key) => key.kid === decodedJwtToken.header.kid);

    const pem = jwkToPem(jwk);

    const decodedToken = jwt.verify(idToken, pem, { algorithms: ['RS256'] })

    return decodedToken;
};

export class VerificationFailedError extends Error { }