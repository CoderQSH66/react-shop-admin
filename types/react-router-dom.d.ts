import type { NonIndexRouteObject } from 'react-router-dom'

declare module 'react-router-dom' {
  export interface RouteObject extends NonIndexRouteObject {
    // 路由元信息
    meta?: {
      //
      title?: string
    }

  }
}
