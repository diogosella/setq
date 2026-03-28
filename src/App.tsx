import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import SignUp from './pages/signupPage';

import Teams from './pages/teamsPage';
import Disabled from './pages/disabledPage';

function App() {
  return (
    <Routes>

      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignUp />} />

     
      <Route path="/teams" element={<Teams />} />
      <Route path="/disabled" element={<Disabled />} />

    </Routes>
  );
}

export default App;