import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard";
import Login from "./login";
import Registration from "./registration";
import SetPassword from "./set-password";
import Amplify from "aws-amplify";

const env = process.env as any

Amplify.configure({
  Auth: {
    region: env.NX_REGION,
    userPoolId: env.NX_USER_POOL_ID,
    userPoolWebClientId: env.NX_USER_POOL_CLIENT_ID,
  },
});

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/registration" element={<Registration />}></Route>
        <Route path="/set-password" element={<SetPassword />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;