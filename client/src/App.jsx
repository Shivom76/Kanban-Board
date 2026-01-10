import React, { useState } from 'react';
import '../public/css/index.css'; // check later if the CSS file is in this path
// import "./App.css";
import "./pages/Register"
import {Routes,Route,Link} from "react-router-dom"
import {useNavigate} from 'react-router-dom'
import KanbanBoard from './components/KanbanBoard';
import Register from './pages/Register';
import Login from './pages/Login';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const token=localStorage.getItem("token")
  const navigate=useNavigate()

  const [isLoggedIn, setIsLoggedIn]=useState(!!localStorage.getItem("token"))

  const handleLogout=()=>{
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    navigate("/")
    setTasks([])
    console.log("User logged Out")
  }

  return (
    <div className="App">
      <ToastContainer position="top-right" autoClose={3000} />
      <nav className="sticky top-0 text-white flex justify-between p-2 mt-0 mb-5 z-20">
        <div className="navL text-2xl font-bold"><Link to="/">Kanban Board</Link></div>
        <div className="navR">
          <ul className="navR_Ul flex content-between items-center">
          {!isLoggedIn?(
          <>
          <li><Link to="/register"><button className="navList my-auto mx-3 rounded-2xl text-white flex items-center border-0 py-2 px-4">Register</button></Link></li>
          <li><Link to="/login"><button className="navList my-auto mx-3 rounded-2xl text-white flex items-center border-0 py-2 px-4">Login</button></Link></li>
          </>):(<li>
              <button className=" rounded-lg flex items-center bg-red-700" onClick={handleLogout}>Logout</button>
            </li>)
          }
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={isLoggedIn?<KanbanBoard/>:<navigate to="/login"/>}/>

        <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
      </Routes>

    </div>
  );
}

export default App;