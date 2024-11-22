import type { RouteObject } from 'react-router-dom'
import LazyLoad from '../LazyLoad'

const mainRoutes: RouteObject = {
  path: '/',
  meta: {
    title: '后台面板'
  },
  children: [
    {
      path: '/index',
      meta: {
        title: '主控台'
      },
      element: <LazyLoad name="index"></LazyLoad>
    }
  ]
}

export default mainRoutes
