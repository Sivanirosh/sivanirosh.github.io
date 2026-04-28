import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'article' | 'li'
}

export function RevealWrapper({ children, delay = 0, className, as = 'div' }: Props) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as]

  if (reduce) {
    return <MotionTag className={className}>{children}</MotionTag>
  }

  return (
    <MotionTag
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </MotionTag>
  )
}
