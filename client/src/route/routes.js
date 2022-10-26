import { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Signup from './pages/signup'


import { UserContext } from './App'

function RoutesComp() {
  const userContext = useContext(UserContext)
  return (
    <>
      <Routes>
        {userContext.username && (
          <Route path='' element={<> {userContext.username}</>} />
        )}
        {!userContext.username && (
          <>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </>
        )}
      </Routes>
    </>
  )
}

export default RoutesComp