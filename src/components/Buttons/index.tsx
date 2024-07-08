import { postMessageCustom } from '@/utils'
import { Button, ButtonProps } from '@nextui-org/react'
import { twMerge } from 'tailwind-merge'

type Props = {
  className?: string
  isDisabled?: boolean
  isLoading?: boolean
} & ButtonProps

const handlePhoneVibration = () => {
  postMessageCustom({ message: 'vibrate' })
}

export function getRadiusClass(classString: string) {
  // Sử dụng regex để tìm và lấy ra giá trị của `radius-*`
  const match = classString.match(/rounded-[^\s]+/)
  return match ? match[0] : null
}

export const PrimaryButton = ({ className, isLoading, isDisabled, children, ...props }: Props) => {
  const radiusClass = getRadiusClass(className || '')
  return (
    <div className='relative z-50 w-full'>
      <Button
        className={twMerge(
          `data-[pressed=true]:scale-1 z-50 w-full select-none ${radiusClass} group relative z-0 box-border inline-flex h-10 w-fit min-w-10 select-none appearance-none items-center justify-center overflow-hidden whitespace-nowrap rounded-full bg-primary-yellow bg-transparent px-0 text-small text-white subpixel-antialiased outline-none tap-highlight-transparent transition-transform-colors-opacity data-[focus-visible=true]:z-10 data-[pressed=true]:translate-y-1 data-[pressed=true]:scale-[0.97] data-[hover=true]:opacity-100 data-[focus-visible=true]:outline-none data-[focus-visible=true]:outline-offset-0 motion-reduce:transition-none ${isLoading ? 'translate-y-1' : ''} ${isDisabled ? 'cursor-not-allowed' : ''}`,
          className
        )}
        isDisabled={isDisabled}
        isLoading={isLoading}
        onPress={(e) => {
          handlePhoneVibration()
          props?.onPress?.(e)
        }}
        {...props}
      >
        {children}
      </Button>
      <div className={`absolute inset-0 z-[10] translate-y-1 bg-[#C69306] ${radiusClass} ${isDisabled ? '' : ''}`} />
    </div>
  )
}
export const PrimaryOutlineButton = ({ className, isDisabled, isLoading, children, ...props }: Props) => {
  const radiusClass = getRadiusClass(className || '')

  return (
    <div className='relative z-50 w-full'>
      <Button
        className={twMerge(
          `data-[pressed=true]:scale-1 z-50 w-full select-none ${radiusClass} group relative z-0 box-border inline-flex h-10 w-fit min-w-10 select-none appearance-none items-center justify-center overflow-hidden whitespace-nowrap rounded-full border border-primary-yellow bg-transparent bg-white px-0 text-small text-primary-yellow subpixel-antialiased outline-none tap-highlight-transparent transition-transform-colors-opacity data-[focus-visible=true]:z-10 data-[pressed=true]:translate-y-1 data-[pressed=true]:scale-[0.97] data-[hover=true]:opacity-100 data-[focus-visible=true]:outline-none data-[focus-visible=true]:outline-offset-0 motion-reduce:transition-none ${isLoading ? 'translate-y-1' : ''}`,
          className
        )}
        isDisabled={isDisabled}
        isLoading={isLoading}
        onPress={(e) => {
          handlePhoneVibration()
          props?.onPress?.(e)
        }}
        {...props}
      >
        {children}
      </Button>
      <div className={`absolute inset-0 z-[-10] translate-y-1 ${radiusClass} ${isDisabled ? '' : 'bg-primary-yellow/80'}`} />
    </div>
  )
}

export const PrimaryLightButton = ({ className, children, ...props }: Props) => {
  const radiusClass = getRadiusClass(className || '')

  return (
    <Button
      onPress={(e) => {
        handlePhoneVibration()
        props?.onPress?.(e)
      }}
      className={twMerge(`${radiusClass} select-none bg-primary-light-blue font-bold text-primary-blue`, className)}
      {...props}
    >
      {children}
    </Button>
  )
}
