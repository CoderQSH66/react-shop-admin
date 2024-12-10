import { local } from '@/utils/Storage'
import React, { memo, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const AuthRoute: React.FC<{ children: React.ReactNode }> = memo(({ children }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  useEffect(() => {
    const token = local.get('token')

    if (token) {
      if (pathname === '/login') {
        navigate('/')
      }
      else {
        navigate(pathname)
      }
    }
    else {
      navigate('/login')
    }
  }, [pathname, navigate])

  return (
    <>{children}</>
  )
})

export default AuthRoute
