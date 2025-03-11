import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import Head from './Pages/Head';
import UpdateGuest from './Pages/UpdateGuest';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Head/*' element={<Head />} />
          <Route path="/UpdateGuest/:_id" element={<UpdateGuest />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
