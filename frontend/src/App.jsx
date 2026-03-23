import './App.css'
import "@fontsource-variable/geist"
import { Routes, Route, Navigate } from 'react-router-dom'
import { Template } from './pages/template'
import { LoginRegister } from './pages/login-register'
import { useAuthStore } from '@/hooks/use-auth'

function App() {
  const isAuth = useAuthStore((state) => state.isAuth)

  return (
    <Routes>
      <Route path="/login" element={<LoginRegister />} />
      <Route path="/register" element={<LoginRegister />} />
      <Route 
        path="/dashboard" 
        element={isAuth ? <Template /> : <Navigate to="/login" />} 
      />
      <Route path="/" element={<Navigate to="/login" />} />      
    </Routes>
  )
}

export default App