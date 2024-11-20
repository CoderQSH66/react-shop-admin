import type { RouteObject } from 'react-router-dom'
import LazyLoad from '../LazyLoad'

const systemRoutes: RouteObject[] = [
  {
    path: '/setting-base',
    element: <LazyLoad name="setting-base"></LazyLoad>
  },
  {
    path: '/setting-buy',
    element: <LazyLoad name="setting-buy"></LazyLoad>
  },
  {
    path: '/setting-ship',
    element: <LazyLoad name="setting-ship"></LazyLoad>
  }
]

export default systemRoutes
