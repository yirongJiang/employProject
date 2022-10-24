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
  return request.get(`jyw/common/all/search?key=${params}`)
}

//招聘信息搜索 TODO
export function getRecruitSearch(params) {
  return request.get(`jyw/homepage/recruitment/search?type=1001&&key=${params}`)
}

//实习信息搜索 TODO
export function getPracticeSearch(params) {
  return request.get(`jyw/homepage/recruitment/search?type=1003&&key=${params}`)
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
  return request.get(`jyw/common/bulletin/search?type=3001&&key=${params}`)
}

//政策搜索 TODO
export function getPolicySearch(params) {
  return request.get(`jyw/common/bulletin/search?type=3002&&key=${params}`)
}

//就业搜索 *
export function getCareerSearch(params) {
  return request.get(`jyw/common//jobGuide/search?key=${params}`)
}

//新闻动态搜索 *
export function getNewsSearch(params) {
  return request(`jyw/common/newsTrends/search?key=${params.inputValue}&&page=${params.page}`)
}

//知名企业搜索 * 
export function getEnterpriseSearch(params) {
  return request.get('jyw/common/wellKnownEnterprises/search', { params })
}

//校招指南搜索 *
export function getSchoolGuideSearch(params) {
  return request.get(`jyw/common//schoolRecruitmentGuide/search?key=${params}`)
}

//职场活动搜索 * 
export function getWorkplaceSearch(params) {
  return request.get(`jyw/common/workplaceActivity/search?key=${params}`)
}