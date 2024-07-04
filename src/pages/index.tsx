import { PrimaryButton } from '@/components/Buttons'
import ImageFallback from '@/components/ImageFallback'
import { keyPossmessage } from '@/constants'
import AILoading from '@/modules/AILoading'
import { ButtonOnlyIcon } from '@/modules/Buttons'
import { TypewriterEffect } from '@/modules/TypewriterEffect'
import { postMessageCustom } from '@/utils'
import { Button, Textarea } from '@nextui-org/react'
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
  const [isBotResponding, setIsBotResponding] = useState(false)
  const [message, setMessage] = useState('')
  const [conversation, setConversation] = useState<TConversation[]>([])

  const sendRef = useRef<any>(null)
  const inputRef = useRef<any>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  const isDisabled = message.trim() === '' || isBotResponding

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    e?.preventDefault()
    setMessage(e?.target?.value)
    if (conversation.length === 0) {
    }
  }

  const handleSendMessage = (e?: React.MouseEvent<HTMLButtonElement>) => {
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
  }

  const handleReset = () => {
    setConversation([])
    setMessage('')
    setIsBotResponding(false)
  }

  const handleTimeEnd = () => {
    setIsLoadingAI(false)
  }

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

  useEffect(() => {
    bottomRef?.current?.scrollIntoView({ behavior: 'smooth' })
  }, [bottomRef, conversation])

  return (
    <div className={`relative flex h-dvh ${isLoadingAI ? 'overflow-hidden' : 'overflow-auto'} flex-col pt-[72px]`}>
      <header
        // initial={{ opacity: 0, y: -100 }}
        // animate={{ opacity: 1, y: 0 }}
        // transition={{ duration: 0.5, delay: 1.5 }}
        className='fixed left-0 right-0 top-0 flex items-center justify-between bg-white p-4'
        style={{ zIndex: 10 }}
      >
        <ButtonOnlyIcon onPress={() => postMessageCustom({ message: keyPossmessage.CAN_POP })}>
          <ArrowLeft2 />
        </ButtonOnlyIcon>
        <p className='flex-1 justify-between text-center text-base font-bold'>AI Vua thợ</p>
        <ButtonOnlyIcon>
          <Refresh2 className='text-primary-yellow' onClick={handleReset} />
        </ButtonOnlyIcon>
      </header>
      <div className={`flex flex-1 flex-col gap-2 overflow-auto py-4`}>
        {isLoadingAI ? (
          <AILoading handleTimeEnd={handleTimeEnd} />
        ) : conversation?.length > 0 ? (
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

      {/* <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.5 }} className='sticky bottom-0 left-0 right-0 flex flex-col gap-2'> */}
      <div className='sticky bottom-0 left-0 right-0 flex flex-col gap-2'>
        {conversation?.length > 100 && !isBotResponding ? (
          <div className='p-4'>
            <IndustryItem />
          </div>
        ) : (
          <div className='pt-2'>
            <p className='text-center text-xs font-light text-primary-gray'>Vua Thợ AI đang trong quá trình hoàn thiện.</p>
            <div className='flex items-end gap-2'>
              <Textarea
                minRows={1}
                maxRows={3}
                autoFocus
                ref={inputRef}
                value={message}
                onChange={handleChangeValue}
                radius='none'
                placeholder='Nhập tin nhắn'
                endContent={
                  <Button
                    ref={sendRef}
                    isIconOnly
                    isDisabled={isBotResponding}
                    radius='full'
                    className='flex items-center justify-center bg-transparent'
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSendMessage()
                    }}
                  >
                    <Send2 variant='Bold' className={`${!isDisabled ? 'text-primary-yellow' : 'text-primary-gray'} transition`} />
                  </Button>
                }
                classNames={{
                  base: '1 px-4',
                  clearButton: '2',
                  description: '3',
                  errorMessage: '4',
                  helperWrapper: '5',
                  label: '6',
                  mainWrapper: '7',
                  innerWrapper: 'items-end',
                  input: 'text-sm text-primary-base placeholder:pl-1 pb-1',
                  inputWrapper:
                    'p-1 !min-h-14 border-none bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent group-data-[focus-visible=true]:ring-0 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-0 group-data-[focus-visible=true]:ring-offset-background shadow-none'
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

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

const IndustryItem = () => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className='z-50 flex flex-col gap-4 rounded-xl bg-white p-4 shadow-[16px_16px_32px_0px_#C1C1C129]'>
      <p className='font-bold'>Thợ sửa xe máy</p>
      <div className='flex flex-col'>
        <p className='text-sm'>Giá kham khảo</p>
        <p className='font-semibold text-primary-yellow'>150,000 - 300,000VND</p>
        <p className='text-primary-green'>90% đúng giá thị trường</p>
      </div>
      <p className='text-sm'>Xe máy của anh đẹp trai có vấn đề lớn lắm không ta, chắc là không đâu</p>
      <PrimaryButton className='h-11 rounded-full font-bold' isLoading={isLoading} onClick={() => setIsLoading(true)}>
        Tìm thợ
      </PrimaryButton>
    </div>
  )
}

export default Home
