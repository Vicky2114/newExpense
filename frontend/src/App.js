import './App.css';
import 'global';
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import PageNotFound from './components/PageNotFound';




function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<ProtectedRoutes><HomePage /></ProtectedRoutes>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='*' component={<PageNotFound/>} />

      </Routes>
    </>
  );
}
//prevent for login user

export function ProtectedRoutes(props) {
  if (localStorage.getItem('user')) {
    return props.children

  } else {
    return <Navigate to="/login" />
  }
  
}
export default App;
