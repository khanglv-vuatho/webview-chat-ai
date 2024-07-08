import { keyPossmessage } from '@/constants'
import { postMessageCustom } from '@/utils'
import { motion } from 'framer-motion'
import { ButtonOnlyIcon } from '../Buttons'
import { ArrowLeft2, Refresh2 } from 'iconsax-react'
import { DefaultModal } from '@/components/Modal'
import ImageFallback from '@/components/ImageFallback'
import { PrimaryButton, PrimaryOutlineButton } from '@/components/Buttons'
import { memo, useEffect, useState } from 'react'
import { TConversation } from '@/types'

type HeaderProps = {
  handleReset: () => void
  conversation: TConversation[]
}
const Header: React.FC<HeaderProps> = ({ handleReset, conversation }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const isHasMessage = conversation.length > 0

  const handleClick = () => {
    if (!isHasMessage) return
    setIsOpen(true)
  }

  const handleCancle = () => {
    setIsOpen(false)
  }
  const handleDelete = () => {
    handleReset()
    setIsOpen(false)
  }

  useEffect(() => {}, [])

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        className='sticky left-0 right-0 top-0 flex items-center justify-between bg-white p-4'
        style={{ zIndex: 10 }}
      >
        <ButtonOnlyIcon
          onPress={() => postMessageCustom({ message: keyPossmessage.CAN_POP })}
          className='group relative z-0 box-border inline-flex h-10 w-fit min-w-10 select-none appearance-none items-center justify-center overflow-hidden whitespace-nowrap rounded-full bg-transparent px-0 text-small font-normal text-default-foreground subpixel-antialiased outline-none tap-highlight-transparent transition-transform-colors-opacity data-[focus-visible=true]:z-10 data-[pressed=true]:scale-[0.97] data-[hover=true]:opacity-hover data-[focus-visible=true]:outline-none data-[focus-visible=true]:outline-offset-0 motion-reduce:transition-none'
        >
          <ArrowLeft2 />
        </ButtonOnlyIcon>
        <p className='justify-between text-center text-base font-bold'>AI Vua thợ</p>
        <ButtonOnlyIcon
          className={`group relative z-0 box-border inline-flex h-10 w-fit min-w-10 select-none appearance-none items-center justify-center overflow-hidden whitespace-nowrap rounded-full bg-transparent px-0 text-small font-normal text-default-foreground subpixel-antialiased outline-none tap-highlight-transparent transition-transform-colors-opacity data-[focus-visible=true]:z-10 data-[pressed=true]:scale-[0.97] data-[hover=true]:opacity-hover data-[focus-visible=true]:outline-none data-[focus-visible=true]:outline-offset-0 motion-reduce:transition-none ${isHasMessage ? 'opacity-100' : 'opacity-0'}`}
          onPress={handleClick}
        >
          <Refresh2 className='text-primary-yellow' />
        </ButtonOnlyIcon>
      </motion.header>
      <DefaultModal isOpen={isOpen} onOpenChange={() => {}}>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col items-center gap-2'>
            <div className='mx-auto w-[120px]'>
              <ImageFallback src='/robot.png' className='size-full' height={400} width={400} />
            </div>
            <p>Xác nhận</p>
          </div>
          <div className='text-center'>Xác nhận tạo mới cuộc trò chuyện</div>
          <div className='flex items-center gap-4'>
            <PrimaryOutlineButton className='h-12 rounded-full' onPress={handleCancle}>
              Huỷ
            </PrimaryOutlineButton>
            <PrimaryButton className='h-12 rounded-full' onPress={handleDelete}>
              Xác nhận
            </PrimaryButton>
          </div>
        </div>
      </DefaultModal>
    </>
  )
}

export default memo(Header)
