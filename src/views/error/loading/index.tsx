import gif from '@/assets/img/404.gif'
import { memo } from 'react'

const index = memo(() => {
  return (
    <div className="loading layout-bg ">
      <div className="gif">
        <img
          style={{
            display: 'block',
            margin: 'auto'
          }}
          src={gif}
        />
      </div>
    </div>
  )
})

export default index
