import type { RouteObject } from 'react-router-dom'
import Layout from '@/layout'
import { createBrowserRouter, Navigate } from 'react-router-dom'

// 路由配置选项
const routerOptions = {
  future: {
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_fetcherPersist: true,
    v7_relativeSplatPath: true,
    v7_skipActionErrorRevalidation: true
  }
}

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/login"></Navigate>
  },
  {
    path: '/',
    element: <Layout></Layout>,
    children: [
      {
        path: '/login',
        element: <Navigate to="/login/home"></Navigate>
      },
      {
        path: '/login/home',
        element: <h2>Home</h2>
      }
    ]
  }
]
const router = createBrowserRouter(routes as any, routerOptions)

export default router
