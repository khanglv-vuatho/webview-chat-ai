import { GoogleGeminiEffect } from '@/components/google-gemini-effect'
import { useScroll, useTransform } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'

export function Test() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  const pathLengthFirst = useTransform(scrollYProgress, [0, 1], [0.2, 2])
  const pathLengthSecond = useTransform(scrollYProgress, [0, 1], [0.15, 2])
  const pathLengthThird = useTransform(scrollYProgress, [0, 1], [0.1, 2])
  const pathLengthFourth = useTransform(scrollYProgress, [0, 1], [0.05, 2])
  const pathLengthFifth = useTransform(scrollYProgress, [0, 1], [0, 2])

  return (
    <div className='flex flex-col' ref={ref}>
      <div className='sticky left-0 right-0 top-0'>
        <GoogleGeminiEffect pathLengths={[pathLengthFirst, pathLengthSecond, pathLengthThird, pathLengthFourth, pathLengthFifth]} />
      </div>
      <div className='h-[2000px] w-full' />
    </div>
  )
}
