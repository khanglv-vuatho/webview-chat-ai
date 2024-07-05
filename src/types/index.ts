import { SVGProps } from 'react'

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number
}
export type TConversation = {
  id: string
  message: string
  time: number
}
