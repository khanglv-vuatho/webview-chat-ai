import { TConversation } from '@/types'
import { memo, useEffect, useRef } from 'react'
import MessageItem from './MessageItem'

type ConversationType = {
  conversation: TConversation[]
  setIsBotResponding: (value: boolean) => void
}

const Conversation: React.FC<ConversationType> = ({ conversation, setIsBotResponding }) => {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef?.current?.scrollIntoView({ behavior: 'smooth' })
  }, [bottomRef, conversation])

  return (
    <div className='flex flex-col gap-2 px-4'>
      {conversation?.map((item, index) => (
        <MessageItem
          onComplete={() => {
            setIsBotResponding(false)
          }}
          key={index}
          id={item?.id}
          msg={item?.message}
        />
      ))}
      <div ref={bottomRef} /> {/* Bottom reference for auto-scrolling */}
    </div>
  )
}

export default memo(Conversation)
