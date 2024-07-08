import { motion } from 'framer-motion'
import { memo, useEffect, useMemo } from 'react'

const TypewriterEffect = ({ words, onComplete }: { words: string; onComplete?: () => void }) => {
  const word = words.split('')

  const time = word.map((item, index) => {
    const delay = (index + 1) * 0.01 * item.length + 0.1
    return item.length * 0.05 + delay
  })
  const lastTime = time[time.length - 1]

  useEffect(() => {
    if (!onComplete) return
    const timer = setTimeout(() => {
      onComplete?.()
    }, lastTime * 1000)

    return () => clearTimeout(timer)
  }, [onComplete, lastTime])

  return word.map((item, index) => {
    return (
      <motion.span
        initial={{
          position: 'fixed',
          opacity: 0
        }}
        animate={{
          position: 'static',
          opacity: 1
        }}
        transition={{
          duration: 0.05,
          delay: (index + 1) * 0.01
        }}
        key={index}
        className='relative'
      >
        {item}
      </motion.span>
    )
  })
}

export default memo(TypewriterEffect)
