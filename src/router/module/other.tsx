import type { RouteObject } from 'react-router-dom'
import LazyLoad from '../LazyLoad'

const otherRoutes: RouteObject = {
  path: '/other',
  meta: {
    title: '其他模块',
    icon: 'HarmonyOSOutlined'
  },
  children: [
    {
      path: '/image-list',
      element: <LazyLoad name="notice-list"></LazyLoad>,
      meta: {
        title: '图库管理',
        icon: 'FileImageOutlined'
      }
    },
    {
      path: '/notice-list',
      element: <LazyLoad name="notice-list"></LazyLoad>,
      meta: {
        title: '公告管理',
        icon: 'BellOutlined'
      }
    }
  ]
}

export default otherRoutes
