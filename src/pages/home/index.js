import  { Fragment, useState } from 'react'
import { View, Image } from "@tarojs/components";
import Practice from './practice';
import Double from './double-choose';
import Recruit from './onlin-recruit';
import LeftList from '../../UI/leftList'
import small from '../../asset/小粽子.png'
import './index.less'
import SearchInput from '../../UI/searchInput';

export default function Home() {

  const [selectNumber, setSelectNumber] = useState(1)
  const url = '/pages/comprehensive/index'
  const selectItem = (number) => {
    switch (number) {
      case 2:
        return <Double />
      case 3:
        return <Practice />
      default:
        return <Recruit />
    }
  }

  const handleSelect = (number) => {
    setSelectNumber(number)
  }

  return (
    <Fragment>
      <LeftList />
      <View className='head-top-wrapper'>
        <View className='head-top'>
          <View>重庆邮电大学就业信息网</View>
        </View>
        <View className='head-search-input'>
          <SearchInput url={url} isPush={true} />
        </View>
        <View className='head-select'>
          <View className={`${(selectNumber !== 2 && selectNumber !== 3) ? "selected" : null}`} onClick={() => { handleSelect(1) }}>线上招聘</View>
          <View className={`${selectNumber === 2 ? "selected" : null}`} onClick={() => { handleSelect(2) }}>宣讲双选</View>
          <View className={`${selectNumber === 3 ? "selected" : null}`} onClick={() => { handleSelect(3) }}>实习信息</View>
        </View>
      </View>
      <View className='home-content'>
        {
          selectItem(selectNumber)
        }
      </View>
      <View className='img-wrapper'>
        <Image src={small}></Image>
        <View className='text-wrapper'>
          <View>友情链接： 教育部 全国高等学校学生信息咨询与就业指导中心 重庆市大学中专毕业生就业指导服务中心 </View>
          <View>全国征兵网 高校毕业生到国际组织实习任职信息服务平台</View>
          <View> Copyright | 联系电话：023-62460145 023-62461639 | 重庆南岸区崇文路2号 | 400065 | 技术支持：北京慧萌信安软件技术有限公司</View>
          <View>渝公网安备 50010802001309号</View>
        </View>
      </View>
    </Fragment >
  )
}
