import type { RouteObject } from 'react-router-dom'
import LazyLoad from '../LazyLoad'

const shopRoutes: RouteObject[] = [
  {
    path: '/goods-list',
    element: <LazyLoad name="goods-list"></LazyLoad>
  },
  {
    path: '/category-list',
    element: <LazyLoad name="category-list"></LazyLoad>
  },
  {
    path: '/sku-list',
    element: <LazyLoad name="sku-list"></LazyLoad>
  },
  {
    path: '/coupon-list',
    element: <LazyLoad name="coupon-list"></LazyLoad>
  }
]

export default shopRoutes
