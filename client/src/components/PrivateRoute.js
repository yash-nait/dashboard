import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'

export default function Privateroute({children}) {
  const {currentUser} = useAuth()

  return (
    currentUser ? children : <Navigate to='signup' replace /> 
  )
}
