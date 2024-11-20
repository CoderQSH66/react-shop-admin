import type { RouteObject } from 'react-router-dom'
import LazyLoad from '../LazyLoad'

const orderRoutes: RouteObject[] = [
  {
    path: '/image-list',
    element: <LazyLoad name="image-list"></LazyLoad>
  },
  {
    path: '/notice-list',
    element: <LazyLoad name="notice-list"></LazyLoad>
  }
]

export default orderRoutes
