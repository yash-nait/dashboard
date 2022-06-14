import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import SignUp from './SignUp'
import Dashboard from './Dashboard'
import Login from './Login'
import { AuthProvider } from '../context/AuthProvider'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'


export default function App() {
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{height: '100vh'}}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/Login" element={<Login />}/>
          </Routes>
        </AuthProvider>
      </Router>
    </Container>
  )
}
