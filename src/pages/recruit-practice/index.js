import React, { Fragment, useState, useEffect } from 'react'
import HeadUI from '../../UI/head-content'
import { recruitPracticeLink } from '../../title-links'
import OnlineandPractice from '../../UI/online-practice'
import { View } from '@tarojs/components'
import { getCurrentInstance } from '@tarojs/taro'
import { getPractice, getRecruit } from '../../api'
import '../../UI/common-outer/index.less'

export default function RecruitPractice() {
  const [number, setNumber] = useState()
  const [data, setData] = useState([])
  const { inputValue } = getCurrentInstance().router.params
  const url = '/pages/recruit-practice/index'

  const outcomes = async (func, params) => {
    const result = await func(params)
    setData(result.data.data.list)
    console.log(result)
  }

  const loadData = async () => {
    outcomes(getRecruit, { key: inputValue })
  }

  const handleChangeData1 = (number) => {
    setNumber(number)
    switch (number) {
      case 1:
        outcomes(getPractice, { key: inputValue })
        break

      default:
        outcomes(getRecruit, { key: inputValue })
    }
  }

  useEffect(() => {
    loadData()
  }, [])


  return (
    <Fragment>
      <HeadUI url={url} handleData={handleChangeData1} selector={recruitPracticeLink} />
      <View className='common-outer'>
        {(data.length !== 0) ?
          data.map((item, index) => {
            return (
              <OnlineandPractice flag={1} detail={item} inputValue={inputValue} />
            )
          }) : <View className='null'> 最近没有企业进校宣讲，
            过一段时间再来看看吧！</View>
        }
      </View>
    </Fragment>
  )
}
