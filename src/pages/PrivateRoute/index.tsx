import React from 'react'
import { Navigate } from 'react-router-dom'

function PrivateRoute({ children }: any) {
  const getLocalStoreageValue = ''
  return !getLocalStoreageValue ? children : <Navigate to='/' />
}

export default PrivateRoute
