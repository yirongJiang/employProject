import request from "./request";

//招聘
export function getRecruit(params) {
  return request.get('jyw/homepage/recruitment/list?type=1001', { params })
}

//实习
export function getPractice(params) {
  return request.get(`jyw/homepage/recruitment/list?type=1003`, { params })
}

///宣讲列表
export function getPreach(params) {
  return request.get(`jyw/homepage/speech/list?page=${params}`)
}

//双选列表
export function getDouble(params) {
  return request.get(`jyw/homepage/doubleChoice/list?page=${params}`)
}

//新闻列表
export function getNews(params) {
  return request.get(`jyw/common/newsTrends/list?page=${params}`)
}

// export function getNews(params) {
//   return request({
//     method:'get',
//     url:'jyw/common/newsTrends/list',
//     params:{
//       params
//     }
//   })
// }


//职场活动查询

export function getWorkplace(params) {
  return request.get('jyw/common/workplaceActivity/list', { params })
}

//公告 查询接口
export function getAnnouncement(params) {
  return request.get('jyw/common/bulletin/list?type=3001', { params })
}

//政策 查询接口
export function getPolicy(params) {
  return request.get('jyw/common/bulletin/list?type=3002', { params })
}

//就业指导查询接口
export function getCareer(params) {
  return request.get('jyw/common/jobGuide/list', { params })
}

//知名企业
export function getEnterprises(params) {
  return request.get('jyw/common/wellKnownEnterprises/list', { params })
}

//校招指南查询接口
export function getSchool(params) {
  return request.get('jyw/common/schoolRecruitmentGuide/list', { params })
}

//学院风采查询接口
export function getDepartment(params) {
  return request.get('jyw/double/department/list', { params })
}




//首页综合搜索接口 TODO
export function getComprehensiveSearch(params) {
  return request.get(`jyw/common/all/search?key=${params.inputValue}&&page=${params.page}`)
}

//招聘信息搜索 TODO
export function getRecruitSearch(params) {
  return request.get(`jyw/homepage/recruitment/search?type=1001&&key=${params.inputValue}&&page=${params.page}`)
}

//实习信息搜索 TODO
export function getPracticeSearch(params) {
  return request.get(`jyw/homepage/recruitment/search?type=1003&&key=${params.inputValue}&&page=${params.page}`)
}

//宣讲搜索 TODO
export function getPreachSearch(params) {
  return request.get(`jyw/homepage/speech/search?key=${params.inputValue}&&page=${params.page}`)
}

//双选搜索 TODO
export function getDoubleSearch(params) {
  return request.get(`jyw/homepage/doubleChoice/search?key=${params.inputValue}&&page=${params.page}`)
}

//公告搜索 *
export function getAnnouncementSearch(params) {
  return request.get(`jyw/common/bulletin/search?type=3001&&key=${params.inputValue}&&page=${params.page}`)
}

//政策搜索 TODO
export function getPolicySearch(params) {
  return request.get(`jyw/common/bulletin/search?type=3002&&key=${params.inputValue}&&page=${params.page}`)
}

//就业搜索 *
export function getCareerSearch(params) {
  return request.get(`jyw/common//jobGuide/search?key=${params.inputValue}&&page=${params.page}`)
}

//新闻动态搜索 *
export function getNewsSearch(params) {
  return request(`jyw/common/newsTrends/search?key=${params.inputValue}&&page=${params.page}`)
}

//知名企业搜索 * 
export function getEnterpriseSearch(params) {
  return request.get(`jyw/common/wellKnownEnterprises/search?key=${params.inputValue}&&page=${params.page}`)
}

//校招指南搜索 *
export function getSchoolGuideSearch(params) {
  return request.get(`jyw/common//schoolRecruitmentGuide/search?key=${params.inputValue}&&page=${params.page}`)
}

//职场活动搜索 * 
export function getWorkplaceSearch(params) {
  return request.get(`jyw/common/workplaceActivity/search?key=${params.inputValue}&&page=${params.page}`)
}


//详情界面

//招聘和实习详情
export function getRecruitDetail(params) {
  return request.get(`jyw/homepage/recruitment/detail?id=${params}`)
}

//实习信息搜索 TODO
// export function getPracticeSearch(params) {
//   return request.get(`jyw/homepage/recruitment/search?type=1003&&key=${params.inputValue}&&page=${params.page}`)
// }

//宣讲详情
export function getPreachDetail(params) {
  return request.get(`jyw/homepage/preach/detail?id=${params}`)
}

//双选详情
export function getDoubleDetail(params) {
  return request.get(`jyjyw/homepage/doubleChoice/detail?id=${params}`)
}

//公告详情
export function getAnnouncementDetail(params) {
  return request.get(`jyw/common/bulletin/announcement/detail?id=${params}`)
}

//政策详情
export function getPolicyDetail(params) {
  return request.get(`jyw/common/bulletin/policy/detail?id=${params}`)
}

//就业详情
export function getCareerDetail(params) {
  return request.get(`jyw/common/bulletin/policy/detail?id=${params}`)
}

//新闻动态详情
export function getNewsDetail(params) {
  return request(`jyw/common/newsTrends/detail?id=${params}`)
}

//知名企业详情
export function getEnterpriseDetail(params) {
  return request.get(`jyw/common/wellKnownEnterprises/detail?id=${params}`)
}

//校招指南详情
export function getSchoolGuideDetail(params) {
  return request.get(`jyw/common//schoolRecruitmentGuide/detail?id=${params}`)
}

//职场活动详情
export function getWorkplaceDetail(params) {
  return request.get(`jyw/common/workplaceActivity/detail?id=${params}`)
}
