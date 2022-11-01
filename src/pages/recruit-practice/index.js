import React, { Fragment, useState, useEffect } from 'react'
import HeadUI from '../../UI/head-content'
import { recruitPracticeLink } from '../../title-links'
import OnlineandPractice from '../../UI/online-practice'
import { ScrollView, View } from '@tarojs/components'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { getPractice, getPracticeSearch, getPreachSearch, getRecruit, getRecruitSearch } from '../../api'
import '../../UI/common-outer/index.less'
import './index.less'

export default function RecruitPractice() {
  const [totalpage, setTotalpage] = useState(2)
  const [currentpage, setCurrentpage] = useState(1)
  const [number, setNumber] = useState(0)
  const { inputValue } = getCurrentInstance().router.params
  const url = '/pages/recruit-practice/index'
  const [datasource, setDatasource] = useState([])

  useEffect(() => {
    switch (number) {
      case 1:
        outcomes(getPractice, getPracticeSearch)
        break
      default:
        outcomes(getRecruit, getRecruitSearch)
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


  const handleChangeData1 = (number) => {
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

  return (
    <Fragment>
      <HeadUI inputValue={inputValue} url={url} handleData={handleChangeData1} selector={recruitPracticeLink} />
      <ScrollView
        className='common-outer'
        scrollY
        scrollWithAnimation
        lowerThreshold='6'
        onScrollToLower={scrollLoad}>
        {(datasource.length !== 0) ?
          datasource?.map((item, index) => {
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
