import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Register from './Register.jsx'
import Home from './home.jsx'
import Task from './task.jsx'
import Createtask from './Createtask.jsx'
import Tasklist from './tasklist.jsx'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'



createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/task" element={<Task/>} />
        <Route path="/Createtask" element={<Createtask/>} />
        <Route path="/tasklist" element={<Tasklist/>} />
      </Routes>
    </Router>
  </StrictMode>,
)
