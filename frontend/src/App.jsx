import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Signin from './routes/Signin';
import Signup from './routes/Signup';
import Dashboard from './routes/Dashboard';
import Send from './routes/Send';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element = {<Dashboard />}/>
          <Route path="transfer/:key/:username" element = {<Send />}/>
          <Route path="signin" element = {<Signin />}/>
          <Route path="signup" element = {<Signup />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
