import { useEffect, useState } from 'react'

export function useHalfScroll() {
  const [windowHalf, setWindowHalf] = useState<number>(window.innerHeight * 0.5)

  const handleWindow = () => {
    setWindowHalf(window.innerHeight * 0.5)
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindow)
    return () => {
      window.removeEventListener('resize', handleWindow)
    }
  })

  return [windowHalf]
}
