import type { RouteObject } from 'react-router-dom'
import LazyLoad from '../LazyLoad'

const otherRoutes: RouteObject[] = [
  {
    path: '/image-list',
    element: <LazyLoad name="notice-list"></LazyLoad>
  },
  {
    path: '/notice-list',
    element: <LazyLoad name="notice-list"></LazyLoad>
  }
]

export default otherRoutes
