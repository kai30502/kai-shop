import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";

import Home from './pages/Home';
import Men from './pages/Men';
import Women from './pages/Women';
import Child from './pages/Child';
import About from './pages/About';
import Login from './pages/Login';
import Member from './pages/Member';
import Cart from './pages/Cart';
import Register from './pages/Register';


// https://coolors.co/palette/d0b8ac-f3d8c7-efe5dc-fbfefb-ffffff
//https://medium.com/%E5%A5%A7%E9%9D%A9%E8%A8%AD%E8%A8%88-startup-studio/%E4%BB%8B%E9%9D%A2%E8%A8%AD%E8%A8%88%E9%9D%88%E6%84%9F-3-76-%E7%B5%84%E4%BB%A4%E4%BA%BA%E9%A9%9A%E5%98%86%E7%9A%84%E8%A8%BB%E5%86%8A%E4%BB%8B%E9%9D%A2%E9%9D%88%E6%84%9F-cee107c7c3a6#.d7ya1swrc


function App() {

  // setMember時會重新渲染畫面，member存會員資料
  const [member, setMember] = useState(() => {
    return JSON.parse(localStorage.getItem('member')) || null;
  });

  return (
    <Router>
      <Header />
      <Nav member={member}/>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/child" element={<Child />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login setMember={setMember} />} />


          <Route path='/member' element={<Member setMember={setMember}/>} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
