import React, { Fragment, useState, use, useEffect } from 'react'
import { View } from '@tarojs/components'
import { getCurrentInstance } from '@tarojs/taro'
import HeadUI from '../../UI/head-content'
import OnlineandPractice from '../../UI/online-practice'
import { comprehensiveLink } from '../../title-links'
import { getComprehensiveSearch, getRecruit, getPractice, getDouble, getAnnouncement } from '../../api'
import './index.less'
import DoubleUi from '../../UI/doubleui'

export default function Comprehensive() {
  const [number, setNumber] = useState()
  const { inputValue } = getCurrentInstance().router.params
  const [nowInput, setNowInput] = useState(inputValue)
  const [data, setData] = useState([])

  const outcomes = async (func, params) => {
    const result = await func(params)
    setData(result.data.page.list)
  }

  const specialOutcomes = async (func, params) => {
    const { data: { data } } = await func(params)
    setData(data)
  }


  const handleChangeData = (number) => {
    setNumber(number)
    switch (number) {
      case 1:
        outcomes(getRecruit, { key: inputValue })
        break
      case 2:
        outcomes(getPractice, { key: inputValue })
        break
      case 3:
        outcomes(getDouble, { key: inputValue })
        break
      case 4:
        specialOutcomes(getAnnouncement, { key: inputValue })
        break
      case 5:
        setData([])
        break
      default:
        specialOutcomes(getComprehensiveSearch, { key: inputValue })
    }
  }


  useEffect(() => {
    specialOutcomes(getComprehensiveSearch, { key: inputValue })
  }, [])

  return (
    <Fragment>
      <HeadUI nowInput={nowInput} handleData={handleChangeData} selector={comprehensiveLink} />
      <View className='compressive-outer'>
        {(data.length !== 0 && number !== 3) ?
          data.map((item, index) => {
            return (
              <OnlineandPractice flag={1} name={item.type} detail={item} />
            )
          }) : (number === 3 ? data.map((item) => { return <DoubleUi flag={1} detail={item} /> }) : <View className='null'> 最近没有企业进校宣讲，
            过一段时间再来看看吧！</View>)
        }
      </View>

    </Fragment>
  )
}
