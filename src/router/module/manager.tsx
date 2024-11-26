import type { RouteObject } from 'react-router-dom'
import LazyLoad from '../LazyLoad'

const managerRoutes: RouteObject = {
  path: '/manager',
  meta: {
    title: '管理员管理',
    icon: 'MacCommandOutlined'
  },
  children: [
    {
      path: '/manager-list',
      element: <LazyLoad name="manager-list"></LazyLoad>,
      meta: {
        title: '管理员管理',
        icon: 'AndroidOutlined'
      }
    },
    {
      path: '/access-list',
      element: <LazyLoad name="access-list"></LazyLoad>,
      meta: {
        title: '权限管理',
        icon: 'RadarChartOutlined'
      }
    },
    {
      path: '/role-list',
      element: <LazyLoad name="role-list"></LazyLoad>,
      meta: {
        title: '角色管理',
        icon: 'GithubOutlined'
      }
    }
  ]
}

export default managerRoutes
