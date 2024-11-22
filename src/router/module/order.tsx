import type { RouteObject } from 'react-router-dom'
import LazyLoad from '../LazyLoad'

const orderRoutes: RouteObject = {
  path: '/order',
  meta: {
    title: '订单管理'
  },
  children: [
    {
      path: '/order-list',
      element: <LazyLoad name="order-list"></LazyLoad>,
      meta: {
        title: '订单管理'
      }
    },
    {
      path: '/comment-list',
      element: <LazyLoad name="comment-list"></LazyLoad>,
      meta: {
        title: '评论管理'
      }
    }
  ]
}

export default orderRoutes
