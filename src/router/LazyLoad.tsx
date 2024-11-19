import React, { memo, Suspense } from 'react'

interface ILazyLoadProps {
  path: string
}

const LazyLoad: React.FC<ILazyLoadProps> = memo(({ path }) => {
  const LoadComponent = React.lazy(() => import(`../views/${path}/index.tsx`))
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoadComponent></LoadComponent>
    </Suspense>
  )
})

export default LazyLoad
