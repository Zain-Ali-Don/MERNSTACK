import logo from './logo.svg';
import './App.css';

import {BrowserRouter, Route, Routes} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap-icons/font/bootstrap-icons.css"
import Main from './Component.jsx/Main';
import Rigester from './Component.jsx/Rigester';
import ShowUser from './Component.jsx/ShowUser';
import Login from './Component.jsx/Login';
import ForgotPassword from './Component.jsx/ForgotPassword';
import ResetPassword from './Component.jsx/ResetPassword';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Routes>
      <Route path='/' element={<Main/>}/>
      <Route path='/reg' element={<Rigester/>}/>
      <Route path='/get' element={<ShowUser/>}/>
      <Route path='/log' element={<Login/>}/>
      <Route path='/fp' element={<ForgotPassword/>}/>
      <Route path='/reset/:token' element={<ResetPassword/>}/>

    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;