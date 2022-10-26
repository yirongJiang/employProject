import Taro from "@tarojs/taro";
export const dealString = (str) => {
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

export const  downLoad = (http) => {
  Taro.showToast({
    title: '正在下载请稍后',
    icon: 'success',
    duration: 2000
  })
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
    }
  })
}

// const outcomes = async (fun, id) => {
  //   const { data: { data } } = await fun(id)
  //   console.log(data)
  //   setDataSource(data)
  // }
// switch (type) {
    //   case '宣讲会':
    //     outcomes(getPreachDetail, detailId)
    //     break;
    //   case '双选会':
    //     outcomes(getDoubleDetail, detailId)
    //     break;
    //   case '公告':
    //     outcomes(getAnnouncementDetail, detailId)
    //     break;
    //   case '政策':
    //     outcomes(getPreachDetail, detailId)
    //     break;
    //   case '实习':
    //     outcomes(getCareerDetail, detailId)
    //     break;
    //   case '新闻动态':
    //     outcomes(getNewsDetail, detailId)
    //     break;
    //   case '知名企业':
    //     outcomes(getEnterpriseDetail, detailId)
    //     break;
    //   case '校招指南':
    //     outcomes(getSchoolGuideDetail, detailId)
    //     break;
    //   case '职场活动':
    //     outcomes(getWorkplaceDetail, detailId)
    //     break;
