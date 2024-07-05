import { keyPossmessage } from '@/constants'
import { postMessageCustom } from '@/utils'
import { motion } from 'framer-motion'
import { ButtonOnlyIcon } from '../Buttons'
import { ArrowLeft2, Refresh2 } from 'iconsax-react'
import { DefaultModal } from '@/components/Modal'
import ImageFallback from '@/components/ImageFallback'
import { PrimaryButton, PrimaryOutlineButton } from '@/components/Buttons'
import { useEffect, useState } from 'react'

type HeaderProps = {
  handleReset: () => void
}
const Header: React.FC<HeaderProps> = ({ handleReset }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleClick = () => {
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
        <ButtonOnlyIcon onPress={() => postMessageCustom({ message: keyPossmessage.CAN_POP })}>
          <ArrowLeft2 />
        </ButtonOnlyIcon>
        <p className='flex-1 justify-between text-center text-base font-bold'>AI Vua thợ</p>
        <ButtonOnlyIcon>
          <Refresh2 className='text-primary-yellow' onClick={handleClick} />
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
            <PrimaryOutlineButton className='rounded-full' onPress={handleCancle}>
              Huỷ
            </PrimaryOutlineButton>
            <PrimaryButton className='rounded-full' onPress={handleDelete}>
              Xác nhận
            </PrimaryButton>
          </div>
        </div>
      </DefaultModal>
    </>
  )
}

export default Header
