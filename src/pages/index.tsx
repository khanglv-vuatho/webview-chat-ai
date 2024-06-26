import { motion } from 'framer-motion'
import { Avatar, Button, Textarea } from '@nextui-org/react'
import { ArrowLeft2, Refresh2, Send2 } from 'iconsax-react'
import { ChangeEvent, useRef, useState } from 'react'
import ImageFallback from '@/components/ImageFallback'
import { ButtonOnlyIcon } from '@/modules/Buttons'
import { TypewriterEffect } from '@/modules/TypewriterEffect'

type TConversation = {
  id: string
  message: string
  time: number
}

const words = 'Xin chào! Hãy cho tôi biết bạn đang cần người thợ như thế nào?'
const Home = () => {
  const [message, setMessage] = useState('')
  const [conversation, setConversation] = useState<TConversation[]>([])

  const inputRef = useRef<any>(null)

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e?.target?.value)
  }

  const handleSendMessage = () => {
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

      setConversation((prevConversation) => [...prevConversation, botResponse])
    }, 1000)
  }

  const handleReset = () => {
    setConversation([])
    setMessage('')
  }

  return (
    <div className='flex h-dvh flex-col'>
      <header className='sticky left-0 right-0 top-0 flex items-center justify-between p-4'>
        <ButtonOnlyIcon>
          <ArrowLeft2 />
        </ButtonOnlyIcon>
        <p className='flex-1 justify-between text-center text-base font-bold'>AI Vua thợ</p>
        <ButtonOnlyIcon>
          <Refresh2 className='text-primary-yellow' onClick={handleReset} />
        </ButtonOnlyIcon>
      </header>
      <div className='flex h-full flex-col gap-2 p-4'>
        {conversation?.length > 0 ? (
          conversation?.map((item, index) => {
            return <MessageItem key={index} id={item?.id} msg={item.message} />
          })
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
      <div className='sticky bottom-0 left-0 right-0 flex flex-col gap-2'>
        {conversation?.length > 5 ? (
          <IndustryItem />
        ) : (
          <>
            <p className='text-center text-xs font-light text-primary-gray'>Vua Thợ AI đang trong quá trình hoàn thiện.</p>
            <div className='flex items-end gap-2 px-4'>
              <Textarea
                ref={inputRef}
                minRows={1}
                maxRows={4}
                onSubmit={handleSendMessage}
                value={message}
                onChange={handleChangeValue}
                radius='none'
                placeholder='Nhập tin nhắn'
                classNames={{
                  base: '1',
                  clearButton: '2',
                  description: '3',
                  errorMessage: '4',
                  helperWrapper: '5',
                  innerWrapper: 'items-end',
                  input: 'text-sm font-light text-primary-gray placeholder:pl-1',
                  inputWrapper:
                    'p-1 min-h-14 border-none bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent group-data-[focus-visible=true]:ring-0 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-0 group-data-[focus-visible=true]:ring-offset-background',
                  label: '9',
                  mainWrapper: '10'
                }}
              />
              <Button isIconOnly radius='full' className='m-2 flex items-center justify-center bg-transparent'>
                <Send2 onClick={handleSendMessage} variant='Bold' className={`${message?.length > 0 ? 'text-primary-yellow' : 'text-primary-gray'} transition`} />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const MessageItem = ({ msg, id }: { id: string; msg: string }) => {
  return (
    <div className={`flex items-end gap-1 ${id === 'bot' ? 'justify-start' : 'justify-end'}`}>
      {id === 'bot' && <Avatar src='/robot.png' className={`size-10 shrink-0`} />}
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
      <Button className='h-11 rounded-full bg-primary-yellow font-bold'>Tìm thợ</Button>
    </div>
  )
}

export default Home
