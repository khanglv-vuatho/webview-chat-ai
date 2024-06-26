import { Button, Input } from '@nextui-org/react'
import { ArrowLeft2, Refresh2, Send2 } from 'iconsax-react'
import { ChangeEvent, useState } from 'react'

const Home = () => {
  const [message, setMessage] = useState('')
  // const [conversation, setConversation] = useState([])

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e?.target?.value)
  }

  const handleSendMessage = () => {
    console.log({ message })
  }

  // test

  return (
    <div className='flex h-dvh flex-col'>
      <header className='sticky left-0 right-0 top-0'>
        <Button className='h-14 w-full justify-between rounded-none bg-transparent p-4 text-base font-bold' startContent={<ArrowLeft2 />} endContent={<Refresh2 className='text-primary-yellow' />}>
          AI Vua thợ
        </Button>
      </header>
      <div className='h-full'>AI Vua thợ</div>
      <div className='sticky bottom-0 left-0 right-0 flex flex-col gap-2'>
        <p className='text-center text-xs font-light text-primary-gray'>Vua Thợ AI đang trong quá trình hoàn thiện.</p>
        <Input
          onSubmit={handleSendMessage}
          value={message}
          onChange={handleChangeValue}
          radius='none'
          placeholder='Nhập tin nhắn'
          endContent={<Send2 onClick={handleSendMessage} variant='Bold' className={`${message?.length > 0 ? 'text-primary-yellow' : 'text-primary-gray'}`} />}
          classNames={{
            base: '1',
            clearButton: '2',
            description: '3',
            errorMessage: '4',
            helperWrapper: '5',
            innerWrapper: '6',
            input: 'text-sm font-light text-primary-gray placeholder:pl-1',
            inputWrapper: '8 px-4 h-14 bg-transparent border-t-1 border-[#F8F8F8] data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent',
            label: '9',
            mainWrapper: '10'
          }}
        />
      </div>
    </div>
  )
}

export default Home
