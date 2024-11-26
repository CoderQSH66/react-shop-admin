import type { RouteObject } from 'react-router-dom'
import LazyLoad from '../LazyLoad'

const userRoutes: RouteObject = {
  path: '/user',
  meta: {
    title: '用户管理',
    icon: 'UserOutlined'
  },
  children: [
    {
      path: '/user-list',
      element: <LazyLoad name="user-list"></LazyLoad>,
      meta: {
        title: '用户管理',
        icon: 'UsergroupAddOutlined'
      }
    },
    {
      path: '/level-list',
      element: <LazyLoad name="level-list"></LazyLoad>,
      meta: {
        title: '会员等级',
        icon: 'TrophyOutlined'
      }
    }
  ]
}

export default userRoutes
