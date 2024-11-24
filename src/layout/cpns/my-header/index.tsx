import logoPng from '@/assets/img/logo.png'
import React, { memo } from 'react'

const MyHeader: React.FC<{ collapsed: boolean }> = memo(({ collapsed }) => {
  return (
    <div className="my-header">
      <div className="logo">
        <img src={logoPng} />
      </div>
      <div
        className="title"
        style={{
          display: collapsed ? 'none' : 'block'
        }}
      >
        CMS-帝莎
      </div>
    </div>
  )
})

export default MyHeader
