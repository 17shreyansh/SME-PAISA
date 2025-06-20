// import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AuthContainer from './screens/auth/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthContainer />} />
        {/* Add more routes here */}
      </Routes>
    </Router>
  );
}

export default App;
