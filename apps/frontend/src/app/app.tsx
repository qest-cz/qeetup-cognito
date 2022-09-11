import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Login from '../components/Login';
import Registration from '../components/Registration';

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
