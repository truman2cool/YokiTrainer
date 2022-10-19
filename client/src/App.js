import React from "react";
import "./css/App.css";
// We use Route in order to define the different routes of our application
import { Route, Routes} from "react-router-dom";

// We import all the components we need in our app
import Home from "./pages/home";
import Edit from "./components/edit";
import Create from "./components/create";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Navbar from "./components/navbar";
import Menu from "./pages/menu";
import About from "./pages/about";


function App () {
 return (
   <div className="App"> 
      <div className="pages">  
      <Navbar />
        <Routes>      
          <Route exact path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login /> } />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/create" element={<Create />} /> 
          <Route path="/about" element={<About />} />
        </Routes>
      </div> 
   </div>
 );
}
 
export default App;