import { motion } from 'framer-motion'

interface Props {
  isLast?: boolean
}

export function TimelineNode({ isLast }: Props) {
  return (
    <div className="absolute left-0 top-0 bottom-0 w-6 flex flex-col items-center pointer-events-none">
      {!isLast && (
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ originY: 0 }}
          className="absolute top-4 bottom-0 w-px bg-slate-200 dark:bg-slate-800"
        />
      )}
      <motion.span
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.2, delay: 0.15, ease: 'easeOut' }}
        className="relative mt-1.5 block w-3 h-3 rounded-full bg-teal-600 dark:bg-teal-400 ring-4 ring-white dark:ring-slate-950"
      />
    </div>
  )
}
