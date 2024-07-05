import { PrimaryButton } from '@/components/Buttons'
import { useState } from 'react'

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

export default IndustryItem
