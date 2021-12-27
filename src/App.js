import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import AddEditUser from './pages/AddEditUser';
import Header from './component/Header';
//import Home 

const App = () => {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/addUser" element={<AddEditUser/>}/>
          <Route  path="/editUser/:id" element={<AddEditUser/>}/>
        </Routes>
      </div>
    </BrowserRouter>
    
  );
};

export default App;