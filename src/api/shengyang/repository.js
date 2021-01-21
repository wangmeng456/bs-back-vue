import request from '@/utils/request'

// 统计数量
export function productLibraryCount() {
  return request({
    url: '/shengyang/repository/productLibraryCount',
    method: 'get'
  })
}
// 查询知识库产品业务
export function queryProductLibraryList(query) {
  return request({
    url: '/shengyang/repository/queryProductLibraryList',
    method: 'get',
    params: query
  })
}

//上传
export function addUpload(fileFormData) {
  return request({
    url: '/common/upload',
    headers: {
      'Content-Type': 'multipart/form-data'
      },
    method: 'post',
    data: fileFormData,
})
}
//下载  无用
export function download(productPapers) {
  return request({
    url: '/common/download?id='+productPapers,
    method: 'get',
    //data: formData,
})
}
// 添加产品业务
export function insertProductLibrary(data) {
   return request({
        url: '/shengyang/repository/insertProductLibrary',
        method: 'post',
        params: data
})
}
// 删除 产品业务
export function deleteProductStatistics(productId) {
  return request({
    url: '/shengyang/repository/deleteProductStatistics?productId='+productId,
    method: 'post',
  })
}


// 下载产品业务+1
export function addProductStatistics(productId) {
  return request({
    url: '/shengyang/repository/addProductStatistics?productId='+productId,
    method: 'post',
  })
}

// 查询知识库案例分享
export function queryCaseLibraryList(query) {
  return request({
    url: '/shengyang/repository/queryCaseLibraryList',
    method: 'get',
    params: query
  })
}
// 添加案例分享
export function insertCaseLibrary(data) {
  return request({
       url: '/shengyang/repository/insertCaseLibrary',
       method: 'post',
       params: data
})
}
// 下载案例分享+1
export function addCaseStatistics(productId) {
  return request({
    url: '/shengyang/repository/addCaseStatistics?caseId='+productId,
    method: 'post',
  })
}
// 删除 案例分享
export function deleteCaseStatistics(caseId) {
  return request({
    url: '/shengyang/repository/deleteCaseStatistics?caseId='+caseId,
    method: 'post',
  })
}

// 查询知识库解决方案
export function querySolutionLibraryList(query) {
  return request({
    url: '/shengyang/repository/querySolutionLibraryList',
    method: 'get',
    params: query
  })
}
// 添加解决方案
export function insertSolutionLibrary(data) {
  return request({
       url: '/shengyang/repository/insertSolutionLibrary',
       method: 'post',
       params: data
})
}
// 下载解决方案+1
export function addSolutionStatistics(productId) {
  return request({
    url: '/shengyang/repository/addSolutionStatistics?solutionId='+productId,
    method: 'post',
  })
}
// 删除 解决方案
export function deleteSolutionStatistics(solutionId) {
  return request({
    url: '/shengyang/repository/deleteSolutionStatistics?solutionId='+solutionId,
    method: 'post',
  })
}