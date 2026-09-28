import {Routes, Route} from 'react-router';
import { FoodProvider } from './context/FoodContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/header';
import Footer from './components/footer';
import AdminPage from './pages/adminPage';
import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage';
import NotFoundPage from './pages/notFoundPage';


function App() {


  return (
    <>
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/bg-image.webp')" }}
    >
    <Header />
    <FoodProvider>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/admin' element={<ProtectedRoute><AdminPage /></ProtectedRoute>}/>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>    
    </FoodProvider>
    </div>
    <Footer />
    </>
  )
}

export default App
