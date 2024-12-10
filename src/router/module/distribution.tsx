import type { RouteObject } from 'react-router-dom'
import AuthRoute from '../AuthRoute'
import LazyLoad from '../LazyLoad'

const distributionRoutes: RouteObject = {
  path: '/distribution',
  meta: {
    title: '分销模块',
    icon: 'ScissorOutlined'
  },
  children: [
    {
      path: '/distribution-index',
      element: (
        <AuthRoute>
          <LazyLoad name="distribution-index"></LazyLoad>
        </AuthRoute>
      ),
      meta: {
        title: '分销员管理',
        icon: 'AndroidOutlined'
      }
    },
    {
      path: '/distribution-setting',
      element: (
        <AuthRoute>
          <LazyLoad name="distribution-setting"></LazyLoad>
        </AuthRoute>
      ),
      meta: {
        title: '分销设置',
        icon: 'StrikethroughOutlined'
      }
    }
  ]
}

export default distributionRoutes
