import { View } from '@tarojs/components'
import React, { Fragment, useState } from 'react'
import { useEffect } from 'react'
import { getPractice } from '../../../api'
import OnlineandPractice from '../../../UI/online-practice'
import './index.less'

export default function Practice() {
  const [practiceList, setPracticeList] = useState([])
  const loadData = async () => {
    const {data:{data:{list}}} = await getPractice({type:3000})
    console.log(list)
    setPracticeList(list)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <View className='common-outer'>
      {practiceList.length ?
        practiceList.map((item) => {
          return (
            <OnlineandPractice name='实习' detail={item} />
          )
        }) : <View className='null'>最近没有企业进校宣讲，
          过一段时间再来看看吧！</View>
      }
    </View>
  )
}
