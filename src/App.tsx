import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import AllProducts from './Pages/AllProducts'
function App() {

  return (
    <BrowserRouter>
     <Navbar/>
      <Routes>
        <Route path="/" element={<AllProducts/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
