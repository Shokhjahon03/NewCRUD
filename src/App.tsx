import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import AllProducts from './Pages/AllProducts'
import Profile from './Pages/Profile'
import { useState } from 'react'
import LoginPage from './Pages/LoginPage'
function App() {
  let [login,setLogin]=useState(false)
  let [profilvalues,setProfilvalues]=useState({name:'',pass:''})
  return (
    <BrowserRouter>
    {
      login?<> <Navbar/>
      <Routes>
        <Route path="/" element={<AllProducts/>}/>
        <Route path="/profile" element={<Profile values={profilvalues}/>}/>
      </Routes></>:<><LoginPage setLogin={setLogin} setProfilvalues={setProfilvalues} /></>
    }
    </BrowserRouter>
  )
}

export default App
