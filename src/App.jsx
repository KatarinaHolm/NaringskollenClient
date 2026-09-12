import {Routes, Route} from 'react-router';
import AdminPage from './pages/adminPage';
import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage';

function App() {


  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/' element={<HomePage />} />
      <Route path='/admin' element={<AdminPage />}/> {/* Protected route */}
    </Routes>
  )
}

export default App
