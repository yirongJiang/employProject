import { View } from '@tarojs/components'
import React, { Fragment, useState } from 'react'
import OnlineandPractice from '../../../UI/online-practice'
import './index.less'
import { getRecruit } from '../../../api'
import { useEffect } from 'react'

export default function Recruit() {

  const [List, setList] = useState([])

  const loadData = async () => {
    const { data:{data:{list}} } = await getRecruit()
    // console.log('first')
    // console.log(list)
    setList(list)
  }

  useEffect(() => {
    loadData()
  }, [])
  
  return (
    <View className='recruit-outer' >

      {List.length ? List.map((item) => {
        return <OnlineandPractice name='招聘' detail={item} />
      }) : <View className='null'>最近没有企业进校宣讲，
        过一段时间再来看看吧！</View>}

    </View>
  )
}
