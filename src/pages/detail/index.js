import { Text, View } from '@tarojs/components'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { useState, useEffect } from 'react'
import './index.less'
import { getAnnouncementDetail, getPreachDetail } from '../../api'

export default function Detail() {
  const { detailId, type } = getCurrentInstance().router.params
  const [dataSource, setDataSource] = useState()
  const [http, setHttp] = useState()
  console.log('basicUrl')
  console.log(type + `?` + detailId)

  const loadData = async () => {
    switch (type) {
      case '宣讲会':
        const { data: { data } } = await getPreachDetail(detailId)
        setDataSource(data)
        const httpResult = dealString(dataSource.content)
        setHttp(httpResult)
        console.log(data)
        break
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const dealString = (str) => {
    let result = "";
    let flag = false;
    for (let char of str) {
      if (char === ">") {
        flag = true;
      }
      if (char === "<") {
        flag = false
      }
      if (flag && char !== ">") {
        result = result + char;
      }
    }
    return result;
  }

  // let str = `<p><span style="color: rgb(51, 51, 51); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 12px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: center; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;">餐饮复工需要什么手续和准备工作。</span><br>
  // </p>`

  const downLoad = () => {
    console.log('first')
    Taro.downloadFile({
      url: `https://job.cqupt.edu.cn${http}`,
      success: function (res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        var filePath = res.tempFilePath;
        Taro.openDocument({
          filePath: filePath,
          fileType: 'docx',
          success: function (res) {
            Taro.showToast({
              title: '文档打开成功',
              icon: 'success',
              duration: 2000
            })
            console.log("文档打开成功");
          },
          fail: function (res) {
            Taro.showToast({
              title: '文档打开失败',
              icon: 'none',
              duration: 2000
            })
          },
        });
        // if (res.statusCode === 200) {
        //   Taro.playVoice({
        //     filePath: res.tempFilePath
        //   })
        // }
      }
    })
  }

  return (
    <View className='detail-wrapper'>
      {
        // dataSource ? <View className='content'>
        //   <View className='content-title'>title}</View>
        //   <View className='content-enterpriseName'>举办方：enterpriseName}</View>
        //   <View className='content-publishTime'>发布时间：publishTime}</View>
        //   <View className='content-duringTime'>startDate}-endTime}</View>
        //   <View className='content-holsPlace'>招聘地点：holdPlace}</View>
        //   <View className='content-writtenPlace'>笔试地点和规模：writtenPlace} | dicWrittenVenueScale}人</View>
        //   <View className='content-interviewPlace'>笔试地点和规模：writtenPlace} | dicInterviewPlaceVenueScale}人</View>
        //   <View className='content-dicGroupRecruitName'>dicGroupRecruitName}</View>
        //   <View className='content-teacher'>负责老师teacher}</View>
        //   {

        //     // dealString( `<div>
        //     //   <p>
        //     //     <a
        //     //       class="ke-insertfile"
        //     //       href="https://job.cqupt.edu.cn/attached/file/2022-09-29/1664441678999深圳市龙岗区坂田街道2022年引进技能人才“百校行”活动组团招聘会详细参会企业及招聘岗位信息汇总.docx"
        //     //       target="_blank" >
        //     //       <span style="color: #e53333">
        //     //         /attached/file/2022-09-29/1664441678999深圳市龙岗区坂田街道2022年引进技能人才“百校行”活动组团招聘会详细参会企业及招聘岗位信息汇总.docx
        //     //       </span>
        //     //     </a>
        //     //   </p>
        //     //   <p>
        //     //     <br />
        //     //   </p>
        //     // </div>`)//餐饮复工需要什么手续和准备工作。
        //     <View style={{width:'60px',backgroundColor:'pink'}} onClick={ downLoad }>下载</View>

        //   }
        // </View> 
        1 ? 
          <View className='content'>
            <View className='content-title'>深圳市龙岗区坂田街道2022年引进技能人才“百校行”活动组团招聘会(17家企业)</View>
            <View className='content-enterpriseName'>举办方:深圳市航嘉驰源电气股份有限公司</View>
            <View className='content-publishTime'>发布时间:2022-09-29 01:452022-10-26-04:00</View>
            <View className='content-duringTime'></View>
            <View className='content-holsPlace'>招聘地点:太极运动场外侧靠游泳池西1门-西6门之间：</View>
            <View className='content-writtenPlace'>面试地点和规模 | 0-70 人</View>
            <View className='content-interviewPlace'>笔试地点和规模：| 0-70人</View>
            <View className='content-dicGroupRecruitName'></View>
            <View className='content-teacher'>负责老师teacher</View>
            <button>下载</button>
          </View>
          : <View className='稍后重试'>请稍后重试</View>
      }
        </View>
  )
}
