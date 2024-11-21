import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { memo, useEffect, useState } from 'react'

const Loading = memo(() => {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    Nprogress.start()
    const timer = setTimeout(() => {
      setVisible(true)
    }, 50)
    return () => {
      clearTimeout(timer)
      setVisible(false)
      Nprogress.done()
    }
  }, [])
  return (
    <>
      {
        visible && (<h2>Loading...</h2>)
      }
    </>
  )
})

export default Loading
