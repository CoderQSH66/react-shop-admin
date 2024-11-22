import type { RouteObject } from 'react-router-dom'
import LazyLoad from '../LazyLoad'

const distributionRoutes: RouteObject = {
  path: '/distribution',
  meta: {
    title: '分销模块'
  },
  children: [
    {
      path: '/distribution-index',
      element: <LazyLoad name="distribution-index"></LazyLoad>,
      meta: {
        title: '分销员管理'
      }
    },
    {
      path: '/distribution-setting',
      element: <LazyLoad name="distribution-setting"></LazyLoad>,
      meta: {
        title: '分销设置'
      }
    }
  ]
}

export default distributionRoutes
