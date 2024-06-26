import { motion } from 'framer-motion'

export const TypewriterEffect = ({ words }: { words: string }) => {
  const word = words.split('')

  return word.map((item, index) => {
    return (
      <motion.span
        initial={{
          position: 'fixed'
        }}
        animate={{
          position: 'static'
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
