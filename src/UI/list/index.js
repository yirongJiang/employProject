import listJpg from '../../../asset/list.jpg'
import React from 'react'
import { Fragment } from 'react'
import { Image } from '@tarojs/components'

export default function ListIcon(props) {

  const hidden=() => { 
    props.hiddenLeftList()
   }

  return (
    <Fragment>
      <Image src={listJpg} className={props.className} onClick={hidden}/>
    </Fragment>
  )
}
