import { App as AntApp, ConfigProvider, Layout } from 'antd'
import { memo } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import type { StateType } from './store'
import createRouter from './router'

const App = memo(() => {
  const { menus } = useSelector((state: StateType) => ({
    menus: state.user.menus
  }), shallowEqual)
  // 创建路由对象
  const router = createRouter(menus)
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
