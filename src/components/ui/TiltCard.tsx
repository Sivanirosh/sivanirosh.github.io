import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import clsx from 'clsx'
import { useIsCoarsePointer } from '../../hooks/useMousePosition'

interface Props {
  children: ReactNode
  className?: string
  maxTilt?: number
}

const SPRING = { stiffness: 200, damping: 20, mass: 0.4 }

export function TiltCard({ children, className, maxTilt = 6 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const reduce = useReducedMotion()
  const coarse = useIsCoarsePointer()

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rX = useSpring(useTransform(my, (v) => -v * maxTilt), SPRING)
  const rY = useSpring(useTransform(mx, (v) => v * maxTilt), SPRING)

  const disabled = reduce || coarse

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mx.set(x)
    my.set(y)
  }

  const handleLeave = () => {
    mx.set(0)
    my.set(0)
  }

  if (disabled) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX: rX,
        rotateY: rY,
        transformPerspective: 900,
        transformStyle: 'preserve-3d',
      }}
      className={clsx('will-change-transform', className)}
    >
      {children}
    </motion.div>
  )
}
