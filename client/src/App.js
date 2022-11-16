import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes} from "react-router-dom";

// We import all the components we need in our app
import Home from "./pages/home";
//import Homebar from "./components/homebar";
import Dashboard from "./pages/Dashboard";
import Edit from "./components/edit";
import Create from "./components/create";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Menu from "./pages/menu";
import Logout from "./pages/logout";
import Test from "./pages/Test";
import CreateTest from "./components/createTest";

function App (){

  return (
     <div className="App">
   <Routes>      
     <Route exact path="/" element={<Home />} />
     <Route path="/dashboard" element={<Dashboard />} />
     <Route path="/login" element={<Login/>}/>
     <Route path="/signup" element={<Signup />} />
     <Route path="/logout" element={<Logout />} />
     <Route path="/edit/:id" element={<Edit />} />
     <Route path="/Test" element={<Test />} />
     <Route path="/menu" element={<Menu />} />
     <Route path="/createTest"  element={<CreateTest />} /> 
     <Route path="/create"  element={<Create />} /> 
   </Routes>
     </div>
   )
  };

export default App;