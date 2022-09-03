import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard";
import Login from "./login";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;