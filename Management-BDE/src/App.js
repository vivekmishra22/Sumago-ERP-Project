import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Login from './Pages/Login';
import Head from './Pages/Head';
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/Head/*' element={<Head/>}/>
      </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;
