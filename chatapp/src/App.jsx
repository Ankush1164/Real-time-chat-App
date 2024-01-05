// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Join from './Components/Join';
import Chat from './Components/Chat';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Join />} />
        <Route path='/chat' element={<Chat/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
