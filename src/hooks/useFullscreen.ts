import { useRef, useState } from 'react'

export default function useFullscreen(fullEle?: Element) {
  const [isFull, setIsFull] = useState(false)
  const fullscreen = useRef<() => void | null>()
  const exitFullscreen = useRef<() => void | null>()

  const fullElement = fullEle || document.documentElement

  fullscreen.current = () => {
    setIsFull(true)
    fullElement.requestFullscreen()
  }

  exitFullscreen.current = () => {
    setIsFull(false)
    document.exitFullscreen()
  }
  return [isFull, fullscreen.current, exitFullscreen.current]
}
