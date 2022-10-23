import React, { Fragment, useState, useEffect } from 'react'
import HeadUI from '../../UI/head-content'
import { recruitPracticeLink } from '../../title-links'
import OnlineandPractice from '../../UI/online-practice'
import { ScrollView, View } from '@tarojs/components'
import { getCurrentInstance } from '@tarojs/taro'
import { getPractice, getPracticeSearch, getPreachSearch, getRecruit, getRecruitSearch } from '../../api'
import '../../UI/common-outer/index.less'
import './index.less'

export default function RecruitPractice() {
  const [number, setNumber] = useState()
  const [data, setData] = useState([])
  const { inputValue } = getCurrentInstance().router.params
  const url = '/pages/recruit-practice/index'

  const outcomes = async (func1, func2) => {
    if (inputValue) {
      const { data:{data:{list}} } = await func2(inputValue)
      // console.log('宣讲双选')
      // console.log(data)
      setData(list)
      return
    }
    const result = await func1()
    console.log(result)
    setData(result.data.data.list)
 
  }

  const loadData = async () => {
    outcomes(getRecruit, getRecruitSearch)
  }

  const handleChangeData1 = (number) => {
    setNumber(number)
    switch (number) {
      case 1:
        outcomes(getPractice, getPracticeSearch)
        break

      default:
        outcomes(getRecruit, getRecruitSearch)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const scrollLoad = () => {
    console.log('first')
  }
  return (
    <Fragment>
      <HeadUI  inputValue={inputValue} url={url} handleData={handleChangeData1} selector={recruitPracticeLink} />
      <ScrollView
        className='recruit-practic-outer'
        scrollY
        scrollWithAnimation
        lowerThreshold='6'
        onScrollToLower={scrollLoad}>
        {(data.length !== 0) ?
          data.map((item, index) => {
            return (
              <OnlineandPractice flag={1} detail={item} inputValue={inputValue} />
            )
          }) : <View className='null'> 最近没有企业进校宣讲，
            过一段时间再来看看吧！</View>
        }
      </ScrollView>
    </Fragment>
  )
}
