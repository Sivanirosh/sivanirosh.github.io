import { useEffect, useState } from 'react'

export function useIsCoarsePointer(): boolean {
  const [isCoarse, setIsCoarse] = useState(false)
  useEffect(() => {
    const media = window.matchMedia('(pointer: coarse)')
    const onChange = () => setIsCoarse(media.matches)
    onChange()
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])
  return isCoarse
}
