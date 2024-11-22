import type { RouteObject } from 'react-router-dom'
import LazyLoad from '../LazyLoad'

const systemRoutes: RouteObject = {
  path: '/system',
  meta: {
    title: '系统设置'
  },
  children: [
    {
      path: '/setting-base',
      element: <LazyLoad name="setting-base"></LazyLoad>,
      meta: {
        title: '基础设置'
      }
    },
    {
      path: '/setting-buy',
      element: <LazyLoad name="setting-buy"></LazyLoad>,
      meta: {
        title: '交易设置'
      }

    },
    {
      path: '/setting-ship',
      element: <LazyLoad name="setting-ship"></LazyLoad>,
      meta: {
        title: '物流设置'
      }
    }
  ]
}

export default systemRoutes
