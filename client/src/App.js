//import React, {useEffect, useState} from "react";
import React from "react";
// We use Route in order to define the different routes of our application
import {Route, Routes} from "react-router-dom";

// We import all the components we need in our app
import Home from "./pages/home";
//import Homebar from "./components/homebar";
import Dashboard from "./pages/Dashboard";
import Employee from "./context/employeeList";
import Edit from "./components/edit";
import UserEdit from "./components/userEdit";
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
import ProgressBar from "./pages/ProgressBar";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";
import TakeQuiz from "./pages/TakeQuiz";
import ViewQuiz from "./pages/ViewQuiz";

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
      axios.get(`/${localStorage.getItem('_ID')}`).then(res => {
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
    <Route path="/auth" element={<Auth/>}/>     
    <Route path="/" element={<Home />} />

    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup />} />
    <Route path="/logout" element={<Logout />} />
    <Route element={<PrivateRoutes/>}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/userEdit/:id" element={<UserEdit />} />
      <Route path="/employee" element={<Employee/>}/>
      <Route path="/Test" element={<Test />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/createQuiz" element={<CreateQuiz />} />
      <Route path="/viewQuiz" element={<ViewQuiz />} />
      <Route path="/ProgressBar" element={<ProgressBar/>}/>
      <Route path="/createTest"  element={<CreateTest />} /> 
      <Route path="/TakeQuiz"  element={<TakeQuiz />} /> 
      <Route path="/create"  element={<Create />} /> 
    </Route>
    
  </Routes>
    </div>
  )
}};
export default App;