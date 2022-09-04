import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './dashboard';
import Login from './login';
import Registration from './registration';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/registration" element={<Registration />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
