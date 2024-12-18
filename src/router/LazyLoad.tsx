import React, { memo, Suspense } from 'react'
import asyncModules from './helper-Router/asyncModules'

interface ILazyLoadProps {
  name: string
}

const LazyLoad: React.FC<ILazyLoadProps> = memo(({ name }) => {
  const LoadComponent = React.lazy(() => new Promise((reslove, _) => {
    asyncModules[name]().then((res) => {
      reslove(res as any)
    }).catch((err) => {
      reslove(asyncModules['load-error']() as any)
      console.log(err)
    })
  }))
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoadComponent></LoadComponent>
    </Suspense>
  )
})

export default LazyLoad
