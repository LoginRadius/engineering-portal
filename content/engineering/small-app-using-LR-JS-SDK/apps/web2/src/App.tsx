import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./AuthPage";
import Dashboard from "./Dashboard";
import RegistrationSuccess from "./RegistrationSuccess";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/registartion_success" element={<RegistrationSuccess />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;