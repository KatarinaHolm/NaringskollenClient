import {Routes, Route} from 'react-router';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/header';
import Footer from './components/footer';
import AdminPage from './pages/adminPage';
import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage';
import { FoodProvider } from './context/FoodContext';

function App() {


  return (
    <>
    <Header />
    <FoodProvider>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/admin' element={<ProtectedRoute><AdminPage /></ProtectedRoute>}/>
      </Routes>    
    </FoodProvider>
    <Footer />
    </>
  )
}

export default App
