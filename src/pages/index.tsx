import ImageFallback from '@/components/ImageFallback'
import AILoading from '@/modules/AILoading'
import Conversation from '@/modules/Conversation'
import FooterInput from '@/modules/FooterInput'
import Header from '@/modules/Header'
import TypewriterEffect from '@/modules/TypewriterEffect'
import { TConversation } from '@/types'
import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'

const words = 'Xin chào! Hãy cho tôi biết bạn đang cần người thợ như thế nào?'

const Home = () => {
  const [isLoadingAI, setIsLoadingAI] = useState(true)
  const [isBotResponding, setIsBotResponding] = useState(false)
  const [message, setMessage] = useState('')
  const [conversation, setConversation] = useState<TConversation[]>([])

  const sendRef = useRef<any>(null)
  const inputRef = useRef<any>(null)

  const isDisabled = message.trim() === '' || isBotResponding

  const handleChangeValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      setMessage(e.target.value)
      if (conversation.length === 0) {
        // Your logic here
      }
    },
    [conversation.length]
  )

  const handleSendMessage = useCallback(
    (e?: React.MouseEvent<HTMLButtonElement>) => {
      if (isDisabled) return
      e?.preventDefault()
      setIsBotResponding(true)

      const newConversation = {
        id: 'user',
        message,
        time: Date.now()
      }

      setConversation((prevConversation) => [...prevConversation, newConversation])
      setMessage('')
      inputRef?.current?.focus()

      setTimeout(() => {
        const botResponse = {
          id: 'bot',
          message: `Bot response to "${newConversation.message}"`,
          time: Date.now()
        }
        setConversation((prevConversation) => [...prevConversation, botResponse])
      }, 1000)
    },
    [isDisabled, message]
  )

  const handleReset = useCallback(() => {
    setConversation([])
    setMessage('')
    setIsBotResponding(false)
  }, [])

  const handleTimeEnd = useCallback(() => {
    setIsLoadingAI(false)
  }, [])

  useEffect(() => {
    const inputEl: any = inputRef?.current
    const sendEl = sendRef.current

    if (!inputEl) return
    if (!sendEl) return

    const handleBlur = (e: any) => {
      if (!sendEl.contains(e.relatedTarget)) {
        inputRef?.current?.blur()
      } else {
        inputEl?.focus()
      }
    }

    inputEl?.addEventListener('blur', handleBlur)

    return () => {
      inputEl?.removeEventListener('blur', handleBlur)
    }
  }, [sendRef, inputRef, message])

  return (
    <div className={`relative flex h-dvh ${isLoadingAI ? 'overflow-hidden' : 'overflow-auto'} flex-col`}>
      <Header handleReset={handleReset} conversation={conversation} />
      <div className={`flex flex-1 flex-col gap-2 overflow-auto py-4`}>
        {isLoadingAI ? (
          <AILoading handleTimeEnd={handleTimeEnd} />
        ) : conversation?.length > 0 ? (
          <Conversation conversation={conversation} setIsBotResponding={setIsBotResponding} />
        ) : (
          <div className='mx-auto flex max-w-[258px] flex-col items-center gap-2'>
            <div className='mx-auto h-12 w-16'>
              <ImageFallback src='/robot.png' className='size-full' />
            </div>
            <div className='text-center text-sm'>
              <TypewriterEffect words={words} />
            </div>
          </div>
        )}
      </div>
      <FooterInput
        conversation={conversation}
        isBotResponding={isBotResponding}
        message={message}
        handleChangeValue={handleChangeValue}
        handleSendMessage={handleSendMessage}
        isDisabled={isDisabled}
      />
    </div>
  )
}

export default Home
