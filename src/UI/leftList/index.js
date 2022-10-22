import "./index.less"
import { Image, View } from "@tarojs/components";
import listJpg from '../../asset/list.jpg'
import zongZi from '../../asset/粽子.png'
import { Fragment, useState } from "react";
import { homeRoutes, top1Routes, topmiddleRoutes, bottomRoutes, bottomtopRoutes } from "../../routes";
import Taro from "@tarojs/taro";

export default function LeftList() {
  const [showList, setShowList] = useState("flase")

  const hiddenLeftList = () => {
    setShowList(!showList)
  }
  const stopProption = (e) => {
    e.stopPropagation()
  }
  const handleNav = (url) => {
    Taro.navigateTo({
      url: url
    })
  }

  const commonView = (arr) => {
    return arr.map((item) => {
      return (<View onClick={() => { handleNav(item.url) }} key={item.name}>{item.name}</View>)
    })
  }

  return (
    <Fragment>
      <Image src={listJpg} className="imageList" onClick={hiddenLeftList} />
      <View onClick={hiddenLeftList} className={`hidden-wrapper ${showList === true ? 'left-wrapper' : null}`} >
        <View className='left-list' onClick={stopProption}>
          <View className='left-header'>

            {/* <Image onClick={hiddenLeftList} className="imageList" src={listJpg} /> */}
            <View className="left-title">目录</View>
          </View>
          <View className='list-name'>
            <View className='left-top-header'>
              {
                commonView(homeRoutes)
              }

            </View>
            <View className='left-top1'>
              {
                commonView(top1Routes)
              }
            </View>
            <View className='left-top-middle'>
              {
                commonView(topmiddleRoutes)
              }
            </View>
            <View className='left-bottmo-top'>
              {
                commonView(bottomtopRoutes)
              }
            </View>
            <View className='left-bottom'>
              {
                commonView(bottomRoutes)
              }
            </View>
          </View>
          <Image className="imageZongZi" src={zongZi} />
        </View>
      </View>
    </Fragment>

  )
}
