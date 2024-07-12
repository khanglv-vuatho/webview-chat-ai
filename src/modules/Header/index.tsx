import { PrimaryButton, PrimaryOutlineButton } from '@/components/Buttons'
import ImageFallback from '@/components/ImageFallback'
import { DefaultModal } from '@/components/Modal'
import { keyPossmessage } from '@/constants'
import { TConversation } from '@/types'
import { postMessageCustom } from '@/utils'
import { motion } from 'framer-motion'
import { ArrowLeft2, Refresh2 } from 'iconsax-react'
import { memo, useCallback, useMemo, useState } from 'react'
import { ButtonOnlyIcon } from '../Buttons'

type HeaderProps = {
  handleReset: () => void
  conversation: TConversation[]
}
const Header: React.FC<HeaderProps> = ({ handleReset, conversation }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const isHasMessage = useMemo(() => {
    return conversation.length > 0
  }, [conversation])

  const handleClick = useCallback(() => {
    if (!isHasMessage) return
    setIsOpen(true)
  }, [conversation])

  const handleCancle = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleDelete = useCallback(() => {
    handleReset()
    setIsOpen(false)
  }, [])

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
          className='outline-none data-[focus-visible=true]:outline-none data-[focus-visible=true]:outline-offset-0'
        >
          <ArrowLeft2 />
        </ButtonOnlyIcon>
        <p className='justify-between text-center text-base font-bold'>AI Vua thợ</p>
        <ButtonOnlyIcon
          className={`outline-none data-[focus-visible=true]:outline-none data-[focus-visible=true]:outline-offset-0 ${isHasMessage ? 'opacity-100' : 'opacity-0'}`}
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
