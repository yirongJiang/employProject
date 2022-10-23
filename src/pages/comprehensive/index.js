import React, { Fragment, useState, use, useEffect } from 'react'
import { View } from '@tarojs/components'
import { getCurrentInstance } from '@tarojs/taro'
import HeadUI from '../../UI/head-content'
import OnlineandPractice from '../../UI/online-practice'
import { comprehensiveLink } from '../../title-links'
import { getComprehensiveSearch, getRecruitSearch, getPracticeSearch, getDoubleSearch, getAnnouncementSearch } from '../../api'
import './index.less'
import DoubleUi from '../../UI/doubleui'

export default function Comprehensive() {
  const [number, setNumber] = useState()
  const { inputValue } = getCurrentInstance().router.params
  // const [nowInput, setNowInput] = useState(inputValue)
  const [data, setData] = useState([])
  const url = '/pages/comprehensive/index'

  const outcomes = async (func, params) => {
    const { data: { data: { list } } } = await func(params)
    console.log('综合')
    console.log(list)
    setData(list)
  }

  // const outcomes = async (func, params) => {
  //   const { data: { data } } = await func(params)
  //   setData(data)
  // }


  const handleChangeData = (number) => {
    setNumber(number)
    switch (number) {
      case 1:
        outcomes(getRecruitSearch, inputValue)
        break
      case 2:
        outcomes(getPracticeSearch, inputValue)
        break
      case 3:
        outcomes(getDoubleSearch, inputValue)
        break
      case 4:
        outcomes(getAnnouncementSearch, inputValue)
        break
      case 5:
        setData([])
        break
      default:
        outcomes(getComprehensiveSearch, inputValue)
    }
  }


  useEffect(() => {
    outcomes(getComprehensiveSearch, inputValue)
  }, [])

  return (
    <Fragment>
      <HeadUI url={url} isCompresive={true} inputValue={inputValue} handleData={handleChangeData} selector={comprehensiveLink} />
      <View className='compressive-outer'>
        {(data.length !== 0 && number !== 3) ?
          data.map((item, index) => {
            return (
              <OnlineandPractice flag={1} name={item.type} detail={item} inputValue={inputValue} />
            )
          }) : (number === 3 ? data.map((item) => { return <DoubleUi flag={1} detail={item} inputValue={inputValue}  /> }) : <View className='null'> 最近没有企业进校宣讲，
            过一段时间再来看看吧！</View>)
        }
      </View>

    </Fragment>
  )
}
