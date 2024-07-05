import { motion } from 'framer-motion'

import ImageFallback from '@/components/ImageFallback'
import { TypewriterEffect } from '../TypewriterEffect'

const MessageItem = ({ msg, id, onComplete }: { id: string; msg: string; onComplete?: () => void }) => {
  return (
    <div className={`flex items-end gap-1 ${id === 'bot' ? 'justify-start' : 'justify-end'}`}>
      {id === 'bot' && (
        <div className='h-12 w-16'>
          <ImageFallback src='/robot.png' className={`size-full scale-85`} />
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, x: id === 'bot' ? 0 : -100, y: id === 'bot' ? 0 : 10 }}
        animate={{
          opacity: 1,
          x: 0,
          y: 0,
          transition:
            id === 'bot'
              ? {
                  duration: 0.1
                }
              : {
                  x: {
                    delay: 0.1,
                    type: 'tween',
                    stiffness: 100,
                    duration: 0.1
                  },
                  y: {
                    duration: 0.1
                  }
                }
        }}
        transition={{ duration: 0.2 }}
        viewport={{ once: true }}
        className={`max-w-[80%] break-words rounded-lg p-2 px-3 ${id === 'bot' ? 'relative bg-primary-light-gray' : 'bg-[#FFFAEA]'}`}
      >
        {id === 'bot' ? (
          <TypewriterEffect words={msg} onComplete={onComplete} />
        ) : (
          <pre className='font-inter break-words' style={{ whiteSpace: 'pre-wrap' }}>
            {msg}
          </pre>
        )}
      </motion.div>
    </div>
  )
}

export default MessageItem
