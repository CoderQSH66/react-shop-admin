import type { RouteObject } from 'react-router-dom'
import LazyLoad from '../LazyLoad'

const mainRoutes: RouteObject[] = [
  {
    path: '/index',
    element: <LazyLoad name="index"></LazyLoad>
  }
]

export default mainRoutes
