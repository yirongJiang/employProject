import { ScrollView, View } from '@tarojs/components'
import React, { Fragment, useEffect, useState, useRef } from 'react'
import HeadUI from '../../UI/head-content'
import { doubleLink } from '../../title-links'
import { getCurrentInstance, useReachBottom } from '@tarojs/taro'
import { getDouble, getDoubleSearch, getPracticeSearch, getPreach, getPreachSearch } from '../../api'
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

  const outcomes = async (func1, func2) => {
    if (inputValue) {
      const { data:{data:{list}} } = await func2(inputValue)
      console.log('宣讲双选')
      console.log(data)
      setData(list)
      return
    }
    const result = await func1()
    console.log(result)
    setData(result.data.data.list)
  }



  const loadData = () => {
    outcomes(getPreach, getPreachSearch)
  }

  const handleChangeData = (number) => {
    setNumber(number)
    switch (number) {
      case 1:
        outcomes(getDouble, getDoubleSearch)
        break
      default:
        outcomes(getPreach, getPreachSearch)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const scrollLoad = () => {
    console.log('first')
  }

  return (<Fragment>
    <HeadUI inputValue={inputValue} url={url} handleData={handleChangeData} selector={doubleLink} />
    <ScrollView
      className='common-outer'
      scrollY
      scrollWithAnimation
      lowerThreshold='6'
      onScrollToLower={scrollLoad}
    >
      {(data && data.length !== 0) ?
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

