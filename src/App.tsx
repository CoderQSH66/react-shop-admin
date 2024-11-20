import { Button } from 'antd'
import React, { memo } from 'react'
import { RouterProvider } from 'react-router-dom'
import createRouter from './router'
import rootChildRoutes from './router/module'

const App = memo(() => {
  // 创建路由对象
  const router = createRouter(rootChildRoutes)
  return (
    <div>
      <Button>按钮</Button>
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true
        }}
      >
      </RouterProvider>
    </div>
  )
})

export default App
