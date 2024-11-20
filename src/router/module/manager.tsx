import type { RouteObject } from 'react-router-dom'
import LazyLoad from '../LazyLoad'

const managerRoutes: RouteObject[] = [
  {
    path: '/access-list',
    element: <LazyLoad name="access-list"></LazyLoad>
  },
  {
    path: '/manager-list',
    element: <LazyLoad name="manager-list"></LazyLoad>
  },
  {
    path: '/role-list',
    element: <LazyLoad name="role-list"></LazyLoad>
  }
]

export default managerRoutes
