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
//import Navbar from "./components/navbar";
import Menu from "./pages/menu";
import About from "./pages/about";
import Logout from "./pages/logout";
import Test from "./pages/Test";
import CreateTest from "./components/createTest";
//import Layout from "./components/Layout";
//import useAuth from "./hooks/useAuth";
//import Unauthorized from "./components/Unauthorized";
//import RequireAuth from "./components/RequireAuth"

/*const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}*/

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
     <Route path="/about" element={<About />} />
   </Routes>
     </div>
   )};

   /*return (
  <Routes>
    <Route path="/" element={<Layout />}>  
        {/*public*/
    /*<Route path="/" element={<Home />} />    
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup />} />
    <Route path="/about" element={<About />} />
    <Route path="/Unauthorized" element={<Unauthorized />} />

    <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/logout" element={<Logout />} />
        </Route>

    <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/edit:id" element={<Edit />} />
        </Route>


    <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/menu" element={<Menu />} />
        </Route>


    <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/create" element={<Create />} />
        </Route>


    </Route>
  </Routes>

  )};*/

export default App;