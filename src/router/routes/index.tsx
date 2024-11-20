import Layout from '@/layout'
import { Navigate, type RouteObject } from 'react-router-dom'

// 根路由
export const rootRoute: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/index"></Navigate>
  },
  {
    path: '/',
    element: <Layout></Layout>,
    children: []
  }
]

const routes: RouteObject[] = [
// 根路由
  ...rootRoute
]

export default routes
