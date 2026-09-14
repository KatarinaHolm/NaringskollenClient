import {Routes, Route} from 'react-router';
import Header from './components/header';
import Footer from './components/footer';
import AdminPage from './pages/adminPage';
import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage';

function App() {


  return (
    <>
    <Header />
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/' element={<HomePage />} />
      <Route path='/admin' element={<AdminPage />}/> {/* Protected route */}
    </Routes>
    <Footer />
    </>
  )
}

export default App
