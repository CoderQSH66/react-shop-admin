import type { RouteObject } from 'react-router-dom'
import LazyLoad from '../LazyLoad'

const userRoutes: RouteObject[] = [
  {
    path: '/user-list',
    element: <LazyLoad name="user-list"></LazyLoad>
  },
  {
    path: '/level-list',
    element: <LazyLoad name="level-list"></LazyLoad>
  }
]

export default userRoutes
