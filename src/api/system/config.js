import request from '@/utils/request'
import qs from 'qs'
// 查询参数列表
export function listConfig(query) {
  return request({
    url: '/system/config/list',
    method: 'get',
    params: query
  })
}

// 查询参数详细
export function getConfig(configId) {
  return request({
    url: '/system/config/' + configId,
    method: 'get'
  })
}

// 根据参数键名查询参数值
export function getConfigKey(configKey) {
  return request({
    url: '/system/config/configKey/' + configKey,
    method: 'get'
  })
}

// 新增参数配置
export function addConfig(data) {
  return request({
    url: '/system/config',
    method: 'post',
    data: data
  })
}

// 修改参数配置
export function updateConfig(data) {
  return request({
    url: '/system/config',
    method: 'put',
    data: data
  })
}

// 删除参数配置
export function delConfig(configId) {
  return request({
    url: '/system/config/' + configId,
    method: 'delete'
  })
}

/**
 * 流程模型接口
 */
export const processModel = {
  // /workflow/model/insert
  // /workflow/model/list
  /**
   * 获取流程模型列表
   */
  getProcessModelList () {
    return request({
      url: '/workflow/model/list',
      method: 'get',
    })
  },

  /**
   * 新增流程模型
   * @param {key, name, category, descp} params 
   * @param {key} 标识
   * @param {name} 名称
   * @param {category} 类别
   * @param {descp} 描述
   */
  addProcessModel (params) {
    return request({
      url: '/workflow/model/insert',
      method: 'post',
      params
    })
  },

  /**
   * 删除流程模型
   * @param {String} modelId 流程模型ID 
   */
  deleteProcessModel (modelId) {
    return request({
      url: '/workflow/deleteModel',
      method: 'get',
      params:{modelId}
    })
  },

  /**
   * 
   * @param {String} modelId 流程模型ID 
   */
  getXml ( modelId ) {
    return request({
      url: `/workflow/model/${modelId}/xml`,
      method: 'get',
    })
  },
}
///
/**
 * 流程设计接口
 */
export const dpmnApi ={
  /**
   * 流程保存
   * @param {String} modelId 模型ID
   * @param {String} bpmn_xml 
   * @param {String} svg_xml 
   */
  dpmnSave (modelId, bpmn_xml, svg_xml) {
    return request({
      url: `/workflow/model/${modelId}/xml/save`,
      method: 'POST',
      headers: {"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",},
      data: qs.stringify({ bpmn_xml, svg_xml })
    })
  },
}