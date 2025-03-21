import { useState } from 'react'
import './App.css'
import './App.css'
import { AnimatePresence } from "framer-motion";
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import News from './pages/News/News'
import Simulators from './pages/Simulators/Simulators'
import Books from './pages/Books/Books'
import Career from './pages/Career/Career'
import Profile from './pages/Profile/Profile'
import Auth from './pages/Auth/Auth';
import BookDetails from './pages/Books/BookDetails';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app'>
      <Navbar/>
      <AnimatePresence mode="wait">
      <div className="space pt-21"></div>
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/news' element={<News />} />
      <Route path='/simulators' element={<Simulators />} />
      <Route path='/books' element={<Books />} />
      <Route path='/career' element={<Career />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/auth' element={<Auth/>} />
      <Route path="/books/:bookId" element={<BookDetails />} />
     </Routes>
    
      </AnimatePresence>
    </div>
  )
}

export default App
