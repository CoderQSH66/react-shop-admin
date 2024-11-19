import React, { memo } from 'react'
import { Outlet } from 'react-router-dom'

const Layout = memo(() => {
  return (
    <>
      <h2>Layout组件</h2>
      <Outlet></Outlet>
    </>
  )
})

export default Layout
