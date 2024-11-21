import { App as AntApp, ConfigProvider } from 'antd'
import { memo } from 'react'
import { RouterProvider } from 'react-router-dom'
import createRouter from './router'
import rootChildRoutes from './router/module'

const App = memo(() => {
  // 创建路由对象
  const router = createRouter(rootChildRoutes)
  return (
    <ConfigProvider theme={{
      cssVar: true
    }}
    >
      <AntApp>
        <div className="App">
          <RouterProvider
            router={router}
            future={{
              v7_startTransition: true
            }}
          >
          </RouterProvider>
        </div>
      </AntApp>
    </ConfigProvider>
  )
})

export default App
