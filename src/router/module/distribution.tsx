import type { RouteObject } from 'react-router-dom'
import LazyLoad from '../LazyLoad'

const distributionRoutes: RouteObject[] = [
  {
    path: '/distribution-index',
    element: <LazyLoad name="distribution-index"></LazyLoad>
  },
  {
    path: '/distribution-setting',
    element: <LazyLoad name="distribution-setting"></LazyLoad>
  }
]

export default distributionRoutes
