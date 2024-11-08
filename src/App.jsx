import Main from "./components/Main.jsx";
import { BrowserRouter as Router, Route, Routes, Switch, BrowserRouter } from 'react-router-dom';
import Appointmentid from "./components/Appointmentid.jsx"
import Groupid from "./components/Groupid.jsx";
import Header from "./components/Header.jsx";
import "../src/css/App.css"

import Footer from "./components/Footer.jsx";


function App() {


  return (

    <BrowserRouter>


       <Header/>
    <div className="container">


    
      <div className="content">

      <Routes>
      <Route path='/' element={<Main />}></Route>
      <Route path='main' element={<Main />}></Route>
      <Route path='main/appointment/:id' element={<Appointmentid />}></Route>
      <Route path='main/group/:id' element={<Groupid />}></Route>
    </Routes>

    </div>
    </div>
    <Footer/>


    </BrowserRouter>

  )
}

export default App;
