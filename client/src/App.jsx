import './App.css';
import { AnimatePresence } from "framer-motion";
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import News from './pages/News/News';
import Simulators from './pages/Simulators/Simulators';
import Books from './pages/Books/Books';
import Career from './pages/Career/Career';
import Profile from './pages/Profile/Profile.jsx';
import Auth from './pages/Auth/Auth';
import BookDetails from './pages/Books/BookDetails';
import LogIn from "./pages/Auth/LogIn.jsx";
import SignUp from './pages/Auth/Signup.jsx';
import Chatbot from './pages/Chatbot/Chatbot.jsx';
import Stocks from './pages/Simulators/Stocks/Stocks.jsx';
import Currency from './pages/Simulators/Currency/Currency.jsx';
import Emi from './pages/Simulators/Emi/Emi.jsx';
import Savings from './pages/Simulators/Savings/Savings.jsx';
import Games from './pages/Games/Games.jsx';
import { Toaster } from "react-hot-toast";
import Quiz from './pages/Games/Quiz.jsx';
import RecommendedModulesCard from './pages/Games/RecommendedModulesCard.jsx';
import ViewAllModules from './pages/Games/ViewAllModules.jsx';
import ModuleDetail from './pages/Games/ModuleDetails.jsx';
import { UserDetailsProvider } from "./Context/UserDetails.jsx"

function App() {
  return (
    <UserDetailsProvider>
      <div className='app'>
        <Navbar />
        <AnimatePresence mode="wait">
          <div className="space pt-21"></div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/news' element={<News />} />
            <Route path="/simulators" element={<Simulators />} />
            <Route path="/simulators/stockmarket" element={<Stocks />} />
            <Route path="/simulators/currency" element={<Currency />} />
            <Route path="/simulators/emi" element={<Emi />} />
            <Route path="/simulators/savings" element={<Savings />} />
            <Route path='/books' element={<Books />} />
            <Route path='/career' element={<Career />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/auth' element={<Auth />} />
            <Route path="/books/:bookId" element={<BookDetails />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/quiz" element={<Quiz />} />
            <Route path="/games/recommendedModules" element={<RecommendedModulesCard />} />
            <Route path="/games/viewAllModules" element={<ViewAllModules />} />
            <Route path="/games/moduleDetails" element={<ModuleDetail />} />
          </Routes>
        </AnimatePresence>
        <Chatbot />
        <Toaster />
      </div>
    </UserDetailsProvider>
  );
}

export default App;
