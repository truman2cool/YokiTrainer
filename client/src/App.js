import React,{createContext, useState, useEffect} from "react";
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
import Navbar from "./components/navbar";
import Menu from "./pages/menu";
import About from "./pages/about";
import Logout from "./pages/logout";
//import useToken from "./hooks/useToken";
export const UserContext = createContext({});

function App (){
  /*const [loading, setLoading] = useState(true);
  const [userSession, setUserSession]= useState(true);
  useEffect(() => {
    const fetchUserAuth = async () => {
      try {
        setLoading(true)
        const res = await fetch("/auth")
        if (!res.ok) return setLoading(false)

        setUserSession(await res.json())
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error('There was an error fetch auth', error)
        return
      }
    }
    fetchUserAuth()
  }, [])*/

   return (
     <div className="App">
      <Navbar />
   <Routes>      
     <Route exact path="/" element={<Home />} />
     <Route path="/dashboard" element={<Dashboard />} />
     <Route path="/login" element={<Login/>}/>
     <Route path="/signup" element={<Signup />} />
     <Route path="/logout" element={<Logout />} />
     <Route path="/edit/:id" element={<Edit />} />
     <Route path="/menu" element={<Menu />} />
     <Route path="/create"  element={<Create />} /> 
     <Route path="/about" element={<About />} />
   </Routes>
     </div>
   )};


   /*<UserContext.Provider value={userSession}>
   <Navbar />
   <Routes>      
     <Route exact path="/" element={<Home />} />
     <Route path="/dashboard" element={<Dashboard />} />
     <Route path="/login" element={<Login/>}/>
     <Route path="/signup" element={<Signup />} />
     <Route path="/logout" element={<Logout />} />
     <Route path="/edit/:id" element={<Edit />} />
     <Route path="/menu" element={<Menu />} />
     <Route path="/create"  element={<Create />} /> 
     <Route path="/about" element={<About />} />
   </Routes>
   </UserContext.Provider>*/
export default App;