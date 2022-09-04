import * as ReactDOM from 'react-dom/client';
import Amplify from 'aws-amplify';

import App from './app/app';

type ProcessEnv = {
  NX_REGION: string;
  NX_USER_POOL_ID: string;
  NX_USER_POOL_CLIENT_ID: string;
};

const env = process.env as ProcessEnv;

Amplify.configure({
  Auth: {
    region: env.NX_REGION,
    userPoolId: env.NX_USER_POOL_ID,
    userPoolWebClientId: env.NX_USER_POOL_CLIENT_ID,
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);
