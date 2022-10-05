import React from "react";
import "./css/App.css";
// We use Route in order to define the different routes of our application
import { Route, Routes} from "react-router-dom";

// We import all the components we need in our app
import Home from "./pages/home";
import Navbar from "./components/navbar";
import RecordList from "./context/recordList";
//import Menu from "./pages/menu";
import Edit from "./components/edit";
import Create from "./components/create";
//import Midsection from "./pages/Midsection";

const App = () => {
  //const { user } = useAuthContext()

 return (
   <div className="App">
   <Navbar />
     <Routes>
       <Route exact path="/pages/home" element={<Home />} />
       <Route path="/context/recordList" element={<RecordList/>} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/create" element={<Create />} />
     </Routes>
   </div>
 );
};
 
export default App;