// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Welcomepage from './pages/Welcomepage';
import SigninPage from './pages/Signin';
import SignupPage from './pages/Signuppage';
import Navbar from './pages/Navbar';
import AddPost from './pages/Addpost';
import Explore from './pages/Explore';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Welcomepage />} /> */}
        <Route path="/" element={<Welcomepage />} />
        <Route path="/sign-in" element={<SigninPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
