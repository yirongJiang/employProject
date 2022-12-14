import { ScrollView, View } from '@tarojs/components'
import React, { Fragment, useEffect, useState, useRef } from 'react'
import HeadUI from '../../UI/head-content'
import { doubleLink } from '../../title-links'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { getDouble, getDoubleSearch, getPreach, getPreachSearch } from '../../api'
import OnlineandPractice from '../../UI/online-practice'
import '../../UI/common-outer/index.less'


export default function DoubleChoose() {

  const [totalpage, setTotalpage] = useState(2)
  const [currentpage, setCurrentpage] = useState(1)
  const [number, setNumber] = useState(0)
  const { inputValue } = getCurrentInstance().router.params
  const url = '/pages/double-choose/index'

  const [datasource, setDatasource] = useState([])

  useEffect(() => {
    switch (number) {
      default:
        outcomes(getPreach, getPreachSearch)
        break
      case 1:
        outcomes(getDouble, getDoubleSearch)
    }
  }, [currentpage, number])

  const outcomes = async (func1, func2) => {
    if (inputValue) {
      const { data: { data } } = await func2({ inputValue, page: currentpage })
      console.log(data)
      setTotalpage(data.totalPage)
      setDatasource(datasource.concat(data.list))
      return
    }
    const { data: { data } } = await func1(currentpage)
    console.log(data)
    setDatasource(datasource => datasource.concat(data.list))
    setTotalpage(data.totalPage)
  }

  const handleChangeData = (number) => {
    setNumber(number)
    setCurrentpage(1)
    setDatasource([])
  }

  const scrollLoad = () => {
    if (currentpage < totalpage) {
      setCurrentpage(currentpage => currentpage + 1)
      return
    }
    Taro.showToast({
      title: "已经是最后一页啦",
      duration: 1000
    });

  }

  return (<Fragment>
    <HeadUI inputValue={inputValue} url={url} handleData={handleChangeData} selector={doubleLink} />
    <ScrollView
      className='common-outer'
      scrollY
      scrollWithAnimation
      lowerThreshold='9'
      onScrollToLower={scrollLoad}
    >
      {(datasource && datasource.length !== 0) ?
        datasource?.map((item, index) => {
          return (
            <OnlineandPractice flag={1} detail={item} inputValue={inputValue} />
          )
        }) : <View className='null'>
          {/* 最近没有企业进校宣讲，
          过一段时间再来看看吧！ */}
          上下拉动刷新试试
        </View>
      }
    </ScrollView>
  </Fragment>
  )
}

