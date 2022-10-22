import { ScrollView, View } from '@tarojs/components'
import React, { Fragment, useEffect, useState, useRef } from 'react'
import HeadUI from '../../UI/head-content'
import { doubleLink } from '../../title-links'
import { getCurrentInstance, useReachBottom } from '@tarojs/taro'
import { getDouble,getPreach } from '../../api'
import OnlineandPractice from '../../UI/online-practice'
import '../../UI/common-outer/index.less'


export default function DoubleChoose() {

  DoubleChoose.config = {
    navigationBarTitleText: '养老待遇发放',
    onReachBottomDistance: 20
  }

  const [number, setNumber] = useState()
  const [data, setData] = useState([])
  const { inputValue } = getCurrentInstance().router.params
  const url = '/pages/double-choose/index'

  const outcomes = async (func, params) => {
    const result = await func(params)
    console.log('result')
    console.log(result)
    setData(result.data.data.list)
  }

  //对宣讲会的数据获取
  // const listoutcomes = async (func, params) => {
  //   const result = await func(params)
  //   console.log(result)
  //   setData(result.data.data)
  // }

  const loadData = () => {
    outcomes(getPreach, { key: inputValue })
  }

  const handleChangeData = (number) => {
    setNumber(number)
    switch (number) {
      case 1:
        outcomes(getDouble, { key: inputValue })
        break
      default:
        // listoutcomes(getAnnounceSearch, { key: inputValue })
        outcomes(getPreach, { key: inputValue })
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const scrollLoad=() => { 
    console.log('first')
   }

  return (<Fragment>
    <HeadUI url={url} handleData={handleChangeData} selector={doubleLink} />
    <ScrollView
      className='common-outer'
      scrollY
      scrollWithAnimation
      lowerThreshold='6'
      onScrollToLower={scrollLoad}
    >   
      {(data&&data.length !== 0) ?
        data.map((item, index) => {
          return (
            <OnlineandPractice flag={1} name={item.type} detail={item} inputValue={inputValue} />
          )
        }) : <View className='null'> 最近没有企业进校宣讲，
          过一段时间再来看看吧！</View>
      }
    </ScrollView>
  </Fragment>
  )
}

