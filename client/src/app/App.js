import Login from '../components/admin/login/login'
import Dashboard from '../components/admin/home'
import Preview from '../components/admin/blog/preview'
// import AddBlog from '../components/admin/blog/addBlog'
import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";


function App() {
  return (
    <div className="App">

      {/* <Dashboard /> */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/preview" element={<Preview />} />
        </Routes>
      </BrowserRouter>

     

      {/* <Page /> */}
    </div>
  );
}

export default App;
