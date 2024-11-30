import { App as AntApp, ConfigProvider, Layout } from 'antd'
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
        <Layout>
          <div className="App">
            <RouterProvider
              router={router}
            >
            </RouterProvider>
          </div>
        </Layout>
      </AntApp>
    </ConfigProvider>
  )
})

export default App
