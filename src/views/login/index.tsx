import React, { memo } from 'react'
import { Outlet } from 'react-router-dom'

const Login = memo(() => {
  return (
    <div>
      <h2>Login</h2>
      <Outlet></Outlet>
    </div>
  )
})

export default Login
