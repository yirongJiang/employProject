import { ScrollView, View } from '@tarojs/components'
import React, { Fragment, useEffect, useState, useRef } from 'react'
import HeadUI from '../../UI/head-content'
import { doubleLink } from '../../title-links'
import { getCurrentInstance, useReachBottom } from '@tarojs/taro'
import { getDouble, getDoubleSearch, getPracticeSearch, getPreach, getPreachSearch } from '../../api'
import OnlineandPractice from '../../UI/online-practice'
import './index.less'
import '../../UI/common-outer/index.less'


export default function DoubleChoose() {

  DoubleChoose.config = {
    navigationBarTitleText: '养老待遇发放',
    onReachBottomDistance: 20
  }

  const [totalpage, setTotalpage] = useState(2)
  const [currentpage, setCurrentpage] = useState(1)
  const [number, setNumber] = useState()
  const [datasource, setDatasource] = useState([])
  const { inputValue } = getCurrentInstance().router.params
  const url = '/pages/double-choose/index'

  const outcomes = async (func1, func2) => {
    if (inputValue) {
      if (currentpage === 1) {
        const { data: { data } } = await func2({ inputValue, page: currentpage })
        setTotalpage(data.totalPage)
        setDatasource(data.list)
        return
      } else if (totalpage > currentpage && currentpage !== 1) {
        const { data: { data } } = await func2({ inputValue, page: currentpage })
        setDatasource(datasource.concat(data.list))
      }
      return
    }
    if (totalpage > currentpage) {
      console.log('currentPage')
      console.log(currentpage)
      const { data: { data } } = await func1(currentpage)
      console.log('data.list')
      console.log(data.list)
      // setDatasource(data.list)
      setDatasource(datasource => datasource.concat(data.list))
      console.log('小黄旋回')
      console.log(datasource)
      // setCurrentpage(data.currPage)
      setTotalpage(data.totalPage)
    }

  }

  const loadData = () => {
    outcomes(getPreach, getPreachSearch)
  }


  const handleChangeData = (number) => {
    setNumber(number)
    setCurrentpage(1)
    setDatasource([])
    console.log('最新的datasource应该为空')
    console.log(datasource)
    switch (number) {
      case 1:
        outcomes(getDouble, getDoubleSearch)
        break
      default:
        outcomes(getPreach, getPreachSearch)
        break
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const scrollLoad = () => {
    if (currentpage < totalpage) {
      setCurrentpage(currentpage => currentpage + 1)
      switch (number) {
        case 1:
          outcomes(getDouble, getDoubleSearch)
          break
        default:
          outcomes(getPreach, getPreachSearch)
      }
    }
    console.log(currentpage)
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
        datasource.map((item, index) => {
          return (
            <OnlineandPractice flag={1} name={item.type} detail={item} inputValue={inputValue} />
          )
        }) : <View className='null'>
          {/* 最近没有企业进校宣讲，
          过一段时间再来看看吧！ */}
          下拉刷新试试
        </View>
      }
    </ScrollView>
  </Fragment>
  )
}

