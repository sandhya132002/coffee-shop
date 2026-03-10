import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './home/Home';
import Login from './component/login/Login';
import SignUp from './component/register/SignUp';

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App;
