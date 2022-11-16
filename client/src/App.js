//import React, {useEffect, useState} from "react";
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
import CreateQuiz from "./pages/createQuiz";
import CreateTest from "./components/createTest";
import Auth from "./pages/Auth";
import axios from "axios";
import store from "./store/store";

/*function App(){

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
     <Route path="/createQuiz" element={<CreateQuiz />} />
     <Route path="/createTest"  element={<CreateTest />} /> 
     <Route path="/create"  element={<Create />} /> 
   </Routes>
     </div>
   )
};*/
class App extends React.Component {

  componentDidMount() {
    if (localStorage.getItem('_ID')) {
      axios.get(`/api/users/${localStorage.getItem('_ID')}`).then(res => {
        store.dispatch({
          user: res.data.user,
          type: 'set_user'
        })
      }).catch(er => {
        console.log(er);
      })
    }
  }
  render(){
  return (
    <div className="App">
  <Routes>      
    <Route exact path="/" element={<Home />} />
    <Route path="/Auth" element={<Auth/>}/>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup />} />
    <Route path="/logout" element={<Logout />} />
    <Route path="/edit/:id" element={<Edit />} />
    <Route path="/Test" element={<Test />} />
    <Route path="/menu" element={<Menu />} />
    <Route path="/createQuiz" element={<CreateQuiz />} />
    <Route path="/createTest"  element={<CreateTest />} /> 
    <Route path="/create"  element={<Create />} /> 
  </Routes>
    </div>
  )
}};
export default App;