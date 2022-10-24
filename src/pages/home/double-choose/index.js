import React, { Fragment, useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import './index.less'
import DoubleUi from '../../../UI/doubleui'
import { getDouble } from '../../../api'

export default function Double() {
  const [doubleList, setDoubleList] = useState([])
  const loadData = async () => {
    const {data:{data:{list}}} = await getDouble(1)
  //  console.log(list)
    setDoubleList(list)
  }
  useEffect(() => {
    loadData()
  }, [])
  return (
    <View className='common-outer' >
      {doubleList.length ?
        doubleList.map((item) => {
          return <DoubleUi detail={item} />
        }) : <View className='null'>最近没有企业进校宣讲，
          过一段时间再来看看吧！</View>
      }
    </View>)
}
