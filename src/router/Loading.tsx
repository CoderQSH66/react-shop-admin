import LoadingError from '@/views/error/loading'
import 'nprogress/nprogress.css'
import Nprogress from 'nprogress'
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
        visible && (<LoadingError></LoadingError>)
      }
    </>
  )
})

export default Loading
