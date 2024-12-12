import Layout from '@/layout'
import { Navigate, type RouteObject } from 'react-router-dom'
import AuthRoute from '../AuthRoute'
import layoutOutsideRoutes from './layout-outside'

// 根路由
export const rootRoute: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/index"></Navigate>
  },
  {
    path: '/',
    element: (
      <AuthRoute>
        <Layout></Layout>
      </AuthRoute>
    ),
    children: []
  }
]

const routes: RouteObject[] = [
// 根路由
  ...rootRoute,
  // 根路由外的路由
  ...layoutOutsideRoutes
]

export default routes
