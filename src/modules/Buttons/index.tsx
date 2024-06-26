import { Button, ButtonProps } from '@nextui-org/react'
import { twMerge } from 'tailwind-merge'

type Props = {
  className?: string
  children: React.ReactNode
} & ButtonProps

const ButtonOnlyIcon = ({ className, children, ...props }: Props) => {
  return (
    <Button {...props} isIconOnly className={twMerge('w-fit rounded-full bg-transparent', className)}>
      {children}
    </Button>
  )
}

export { ButtonOnlyIcon }
