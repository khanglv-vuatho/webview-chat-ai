import { PrimaryButton } from '@/components/Buttons'
import ImageFallback from '@/components/ImageFallback'
import { keyPossmessage } from '@/constants'
import AILoading from '@/modules/AILoading'
import { ButtonOnlyIcon } from '@/modules/Buttons'
import { TypewriterEffect } from '@/modules/TypewriterEffect'
import { postMessageCustom } from '@/utils'
import { Button, Input } from '@nextui-org/react'
import { motion } from 'framer-motion'
import { ArrowLeft2, Refresh2, Send2 } from 'iconsax-react'
import { ChangeEvent, useEffect, useRef, useState } from 'react'

type TConversation = {
  id: string
  message: string
  time: number
}

const words = 'Xin chào! Hãy cho tôi biết bạn đang cần người thợ như thế nào?'
const Home = () => {
  const [isLoadingAI, setIsLoadingAI] = useState(true)
  const [message, setMessage] = useState('')
  const [conversation, setConversation] = useState<TConversation[]>([])
  const [isTyping, setIsTyping] = useState(false)

  const sendRef = useRef<any>(null)
  const inputRef = useRef<any>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const isDisabled = !isTyping || !message?.length

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e?.target?.value)
    if (conversation.length === 0) {
      setIsTyping(true)
    }
  }

  const handleSendMessage = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault() // Prevent default form submission behavior
    if (isDisabled) return
    setIsTyping(false)
    if (message.trim() === '') return

    const newConversation = {
      id: 'user',
      message,
      time: Date.now()
    }

    setConversation((prevConversation) => [...prevConversation, newConversation])
    setMessage('')
    inputRef?.current?.focus()

    // Simulate bot response after user message
    setTimeout(() => {
      const botResponse = {
        id: 'bot',
        message: `Bot response to "${newConversation.message}"`,
        time: Date.now()
      }
      setIsTyping(true)
      setConversation((prevConversation) => [...prevConversation, botResponse])
    }, 1000)
  }

  const handleReset = () => {
    setConversation([])
    setMessage('')
  }

  const handleTimeEnd = () => {
    setIsLoadingAI(false)
  }

  useEffect(() => {
    const inputEl: any = inputRef.current

    const handleBlur = (e: any) => {
      if (!sendRef.current.contains(e.relatedTarget)) {
        inputRef?.current?.blur()
      } else {
        inputEl.focus() // Focus lại vào input nếu không phải click vào sendRef
      }
    }

    inputEl?.addEventListener('blur', handleBlur)

    return () => {
      inputEl?.removeEventListener('blur', handleBlur)
    }
  }, [sendRef, inputRef, message])

  useEffect(() => {
    if (!bottomRef.current) return

    bottomRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [conversation])

  return (
    <div className={`flex h-dvh ${isLoadingAI ? 'overflow-hidden' : 'overflow-auto'} flex-col`}>
      <motion.header
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        className='sticky left-0 right-0 top-0 flex items-center justify-between bg-white p-4'
        style={{ zIndex: 10 }}
      >
        <ButtonOnlyIcon onPress={() => postMessageCustom({ message: keyPossmessage.CAN_POP })}>
          <ArrowLeft2 />
        </ButtonOnlyIcon>
        <p className='flex-1 justify-between text-center text-base font-bold'>AI Vua thợ</p>
        <ButtonOnlyIcon>
          <Refresh2 className='text-primary-yellow' onClick={handleReset} />
        </ButtonOnlyIcon>
      </motion.header>
      <div className={`flex flex-1 flex-col gap-2 overflow-auto py-4`} ref={containerRef}>
        {isLoadingAI ? (
          <AILoading handleTimeEnd={handleTimeEnd} />
        ) : conversation?.length > 0 ? (
          <div className='flex flex-col gap-2 px-4'>
            {conversation?.map((item, index) => {
              return <MessageItem key={index} id={item?.id} msg={item.message} />
            })}
            <div ref={bottomRef} /> {/* Bottom reference for auto-scrolling */}
          </div>
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

      <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.5 }} className='sticky bottom-0 left-0 right-0 flex flex-col gap-2'>
        {conversation?.length > 15 ? (
          <div className='p-4'>
            <IndustryItem />
          </div>
        ) : (
          <>
            <p className='text-center text-xs font-light text-primary-gray'>Vua Thợ AI đang trong quá trình hoàn thiện.</p>
            <div className='flex items-end gap-2 px-4'>
              <Input
                key={isLoadingAI.toString()}
                autoFocus
                ref={inputRef}
                value={message}
                onChange={handleChangeValue}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                radius='none'
                placeholder='Nhập tin nhắn'
                endContent={
                  <Button
                    ref={sendRef}
                    isIconOnly
                    radius='full'
                    className='m-2 flex items-center justify-center bg-transparent'
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSendMessage()
                    }}
                  >
                    <Send2 variant='Bold' className={`${!isDisabled ? 'text-primary-yellow' : 'text-primary-gray'} transition`} />
                  </Button>
                }
                classNames={{
                  innerWrapper: 'items-end',
                  input: 'text-sm text-primary-base placeholder:pl-1',
                  inputWrapper:
                    'p-1 min-h-14 border-none bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent group-data-[focus-visible=true]:ring-0 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-0 group-data-[focus-visible=true]:ring-offset-background'
                }}
              />
            </div>
          </>
        )}
      </motion.div>
    </div>
  )
}

const MessageItem = ({ msg, id }: { id: string; msg: string }) => {
  return (
    <div className={`flex items-end gap-1 ${id === 'bot' ? 'justify-start' : 'justify-end'}`}>
      {id === 'bot' && (
        <div className='h-12 w-16'>
          <ImageFallback src='/robot.png' className={`size-full scale-85`} />
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, x: id === 'bot' ? 0 : -100, y: id === 'bot' ? 0 : 30 }}
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
                    delay: 0.13,
                    type: 'tween',
                    stiffness: 100
                  },

                  y: {
                    duration: 0.1
                  }
                }
        }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}
        className={`max-w-[80%] break-words rounded-lg p-2 px-3 ${id === 'bot' ? 'relative bg-primary-light-gray' : 'bg-[#FFFAEA]'}`}
      >
        {id === 'bot' ? <TypewriterEffect words={msg} /> : msg}
      </motion.div>
    </div>
  )
}

const IndustryItem = () => {
  return (
    <div className='z-50 flex flex-col gap-4 rounded-xl bg-white p-4 shadow-[16px_16px_32px_0px_#C1C1C129]'>
      <p className='font-bold'>Thợ sửa xe máy</p>
      <div className='flex flex-col'>
        <p className='text-sm'>Giá kham khảo</p>
        <p className='font-semibold text-primary-yellow'>150,000 - 300,000VND</p>
        <p className='text-primary-green'>90% đúng giá thị trường</p>
      </div>
      <p className='text-sm'>Xe máy của anh đẹp trai có vấn đề lớn lắm không ta, chắc là không đâu</p>
      <PrimaryButton className='text-primary-base h-11 rounded-full bg-primary-yellow font-bold'>Tìm thợ</PrimaryButton>
    </div>
  )
}

export default Home
