import { Message, TAllMessage, TConversation } from '@/types'
import { memo, useCallback, useEffect, useRef } from 'react'
import MessageItem from './MessageItem'

type ConversationType = {
  setIsBotResponding: (value: boolean) => void
  conversation: Message[]
}

const Conversation: React.FC<ConversationType> = ({ setIsBotResponding, conversation }) => {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef?.current?.scrollIntoView({ behavior: 'smooth' })
  }, [bottomRef, conversation])

  const handleComplete = useCallback(() => {
    setIsBotResponding(false)
  }, [])
  console.log({ conversation })
  return (
    <div className='flex flex-col gap-2 px-4'>
      {conversation?.map((item, index) => <MessageItem onComplete={handleComplete} key={index} by_me={item?.by_me} msg={item.content} />)}
      <div ref={bottomRef} /> {/* Bottom reference for auto-scrolling */}
    </div>
  )
}

export default memo(Conversation)
