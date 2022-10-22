import React from 'react'
import { Image } from '@tarojs/components'
import headIcon from '../../../asset/header.jpg'

export default function Head(props) {
  return (
    <Image className={props.className}  src={headIcon} />
  )
}
