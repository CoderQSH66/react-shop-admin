import type { RouteObject } from 'react-router-dom'
import LazyLoad from '../LazyLoad'

const shopRoutes: RouteObject = {
  path: '/shop',
  meta: {
    title: '商品管理'
  },
  children: [
    {
      path: '/goods-list',
      element: <LazyLoad name="goods-list"></LazyLoad>,
      meta: {
        title: '商品管理'
      }
    },
    {
      path: '/category-list',
      element: <LazyLoad name="category-list"></LazyLoad>,
      meta: {
        title: '分类管理'
      }
    },
    {
      path: '/sku-list',
      element: <LazyLoad name="sku-list"></LazyLoad>,
      meta: {
        title: '规格管理'
      }
    },
    {
      path: '/coupon-list',
      element: <LazyLoad name="coupon-list"></LazyLoad>,
      meta: {
        title: '优惠券管理'
      }
    }
  ]
}

export default shopRoutes
