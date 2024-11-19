import { Button } from 'antd'
import React, { memo } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './router'

const App = memo(() => {
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
