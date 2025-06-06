import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListUsers from "./pages/ListUsers/ListUsers"
import AddDiscount from './pages/AddDiscount/AddDiscount';

const url = "http://localhost:4000";

const App = () => {
  return (
    <>  
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr/>
      <div className="app-content">
        <Sidebar/>      
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path='/add-discount' element={<AddDiscount url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Orders url={url} />} />
          <Route path="/listusers" element={<ListUsers url={url} />} />
        </Routes>
      </div>
    </div>
    </>
  )
};

export default App
