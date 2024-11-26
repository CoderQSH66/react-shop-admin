import type { NonIndexRouteObject } from 'react-router-dom'

declare module 'react-router-dom' {
  export interface RouteObject extends NonIndexRouteObject {
    // 路由元信息
    meta?: {
      // 路由标题
      title?: string
      // 路由icon
      icon?: string
    }
    children?: RouteObject[]

  }
}
