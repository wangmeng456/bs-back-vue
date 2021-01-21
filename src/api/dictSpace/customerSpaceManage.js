// 客户信息采集 页面接口
import request from '@/utils/request'
import qs from 'qs'

export const customerSpaceManage = {
  /**
   * 获取 企业客户信息完整率 数据
   */
  getCompInformationIntegrityRate() {
    return request({
      url: '/shenyang/company/getCompInformationIntegrityRate',
      method: 'get'
    })
  },
  /**
   * 获取 企业客户列表信息 数据
   * @param {Number} pageNum 页码
   * @param {Number} pageSize 每页展示的数字
   * @param {Number} searchValue 检索关键字
   */
  getcompanybyname({
    pageNum,
    pageSize,
    searchValue
  }) {
    let params = {
      pageNum,
      pageSize,
      searchValue
    }
    return request({
      url: '/shenyang/company/getcompanybyname',
      method: 'get',
      params
    })
  },
  /**
   * 获取 单个企业客户的详情数据
   * @param {Number} id 企业客户 id
   */
  getcompanybyid({
    id
  }) {
    let params = {
      id
    }
    return request({
      url: '/shenyang/company/getcompanybyid',
      method: 'get',
      params
    })
  },
  /**
   * 更新 单个企业客户的详情数据
   * @param {Number} companyId 企业客户 id
   * @param {String} companyName 企业客户名称
   * @param {String} companyAddr 企业经营地址
   * @param {Number} custType 企业客户类型
   * 101 存量
      102 蓝海
      103 移动
      104 联通
      105 其他
      106 未知
      999 蓝海废弃
      998 他网废弃
      997 存量废弃
   * @param {String} busiScale 经营额规模（万元）
   * @param {String} companySpace 办公面积
   * @param {Number} companyStaff 公司人数规模
   * @param {String} contactPhone 公司电话
   * @param {String} bldgFloor 企业楼层
   * @param {Number} managerId 客户经理编码
   * @param {String} companyUnit 单元号
   * @param {String} companyRoom 房间号
   * @param {JSON} business 业务类型
   * @param {Number} busiId 业务类型
      1 宽带
      2 固话
      3 移动
      4 天翼高清
      * @param {String} busiProvider 业务提供商
      * @param {String} otherManagerName 异网客户经理
      * @param {String} otherManagerPhone 异网客户经理联系方式
      * @param {String} busiEndDate 业务到期时间 2019-11-08
   */
  updatecompany({
    companyId,
    companyName,
    companyAddr,
    custType,
    busiScale,
    companySpace,
    companyStaff,
    contactPhone,
    bldgFloor,
    managerId,
    companyUnit,
    companyRoom,
    business
  }) {
    let params = {
      companyId,
      companyName,
      companyAddr,
      custType,
      busiScale,
      companySpace,
      companyStaff,
      contactPhone,
      bldgFloor,
      managerId,
      companyUnit,
      companyRoom,
      business
    }
    return request({
      url: '/shenyang/company/updatecompany',
      method: 'post',
      data: params
    })
  },
  /**
   * 新增企业客户
   * @param {Number} bldgId 楼宇 id
   * @param {String} companyName 企业客户名称
   * @param {String} companyAddr 企业经营地址
   * @param {Number} custType 企业客户类型
   * 101 存量
      102 蓝海
      103 移动
      104 联通
      105 其他
      106 未知
      999 蓝海废弃
      998 他网废弃
      997 存量废弃
   * @param {String} busiScale 经营额规模（万元）
   * @param {String} companySpace 办公面积
   * @param {Number} companyStaff 公司人数规模
   * @param {String} contactPhone 公司电话
   * @param {String} bldgFloor 企业楼层
   * @param {Number} managerId 客户经理编码
   * @param {String} companyUnit 单元号
   * @param {String} companyRoom 房间号
   * @param {JSON} business 业务类型
   * @param {Number} busiId 业务类型
      1 宽带
      2 固话
      3 移动
      4 天翼高清
      * @param {String} busiProvider 业务提供商
      * @param {String} otherManagerName 异网客户经理
      * @param {String} otherManagerPhone 异网客户经理联系方式
      * @param {String} busiEndDate 业务到期时间 2019-11-08
   */
  addcompany({
    bldgId,
    companyName,
    companyAddr,
    custType,
    busiScale,
    companySpace,
    companyStaff,
    contactPhone,
    bldgFloor,
    managerId,
    companyUnit,
    companyRoom,
    business
  }) {
    let params = {
      bldgId,
      companyName,
      companyAddr,
      custType,
      busiScale,
      companySpace,
      companyStaff,
      contactPhone,
      bldgFloor,
      managerId,
      companyUnit,
      companyRoom,
      business
    }
    return request({
      url: '/shenyang/company/addcompany',
      method: 'post',
      data: params
    })
  },
  /**
   * 获取 单个企业客户的更新历史数据
   * @param {Number} companyId 企业客户 id
   */
  getcompanyhistory({
    id
  }) {
    let params = {
      id
    }
    return request({
      url: '/shenyang/company/getcompanyhistory',
      method: 'get',
      params
    })
  },
  /**
   * 新增企业客户时，获取 楼宇列表信息 数据
   * @param {Number} pageNum 页码
   * @param {Number} pageSize 每页展示的数字
   * @param {Number} searchValue 检索关键字
   */
  getbuildingbyname({
    pageNum,
    pageSize,
    searchValue
  }) {
    let params = {
      pageNum,
      pageSize,
      searchValue
    }
    return request({
      url: '/shenyang/building/getbuildingbyname',
      method: 'get',
      params
    })
  },
  /**
   * 获取 联系人表格 数据
   * @param {Number} companyId 企业客户 id
   * @param {Number} pageNum 页码
   * @param {Number} pageSize 每页展示的数字
   */
  getcompanycontact({
    pageNum,
    pageSize,
    companyId
  }) {
    let params = {
      pageNum,
      pageSize,
      companyId
    }
    return request({
      url: '/shenyang/companycontact/getcompanycontact',
      method: 'get',
      params
    })
  },
  /**
   * 删除 单个联系人 数据
   * @param {Number} contactId 联系人 id
   */
  deletecompanycontact({
    contactId
  }) {
    let params = {
      contactId
    }
    return request({
      url: '/shenyang/companycontact/deletecompanycontact',
      method: 'get',
      params
    })
  },
  /**
   * 编辑 单个联系人 数据
   * @param {Number} contact_id 联系人 id
   * @param {String} contact_name 联系人名称
   * @param {String} contact_gender 联系人性别(1男，2女，3未知)
   * @param {String} contast_phone 联系人电话
   * @param {String} contact_pstn 联系人岗位
   */
  updatecompanycontact({
    contact_name,
    contact_id,
    contact_gender,
    contact_phone,
    contact_pstn
  }) {
    let params = {
      contact_name,
      contact_id,
      contact_gender,
      contact_phone,
      contact_pstn
    }
    return request({
      url: '/shenyang/companycontact/updatecompanycontact',
      method: 'post',
      params
    })
  },
  /**
   * 添加 单个联系人
   * @param {Number} company_id 企业客户 id
   * @param {String} contact_name 联系人名称
   * @param {String} contact_gender 联系人性别(1男，2女，3未知)
   * @param {String} contast_phone 联系人电话
   * @param {String} contact_pstn 联系人岗位
   */
  addcompanycontact({
    company_id,
    contact_name,
    contact_gender,
    contact_phone,
    contact_pstn
  }) {
    let params = {
      company_id,
      contact_name,
      contact_gender,
      contact_phone,
      contact_pstn
    }
    return request({
      url: '/shenyang/companycontact/addcompanycontact',
      method: 'post',
      params
    })
  },
  /**
   * 获取 楼宇列表信息 数据 新增企业客户用到
   * @param {Number} pageNum 页码
   * @param {Number} pageSize 每页展示的数字
   * @param {Number} searchValue 检索关键字
   */
  getbuildingbyname({
    pageNum,
    pageSize,
    searchValue
  }) {
    let params = {
      pageNum,
      pageSize,
      searchValue
    }
    return request({
      url: '/shenyang/building/getbuildingbyname',
      method: 'get',
      params
    })
  },
  /**
   * 获取 商机调查 表单 数据
   * @param {Number} companyId 企业客户 id
   */
  getsurvey({
    companyId
  }) {
    let params = {
      companyId
    }
    return request({
      url: '/shenyang/company/getsurvey',
      method: 'get',
      params
    })
  },
  /**
   * 提交 商机调查 表单 数据
   * @param {Number} companyId 企业客户 id
   * @param {String} netCnt 公司网络使用人数规模
   * @param {Number} isInterNet 是否有访问国外网络链路的需求？（1有0无）
   * @param {Number} isNetPerson 是否有配置专职网络管理人员？（1有0无）
   * @param {String} interCondition 贵公司如何规范员工上网的？1规章制度要求 2采购设备限制上网行为 1,2
   * @param {Number} isClockin 是否需要上下班打卡？（1是0否）
   * @param {Number} isContact 销售人员是否需要常常拜访客户，电话联络客户，公司是否需要对其进行管控？（1是0否）
   * @param {Number} isCertificate 出差报销是否需要凭证？（1是0否）
   * @param {Number} isGoodWifi 公司局域网是否信号覆盖不均匀？（1是0否）
   * @param {Number} isManyWifi 公司是否有多个WIFI热点？（1是0否）
   * @param {Number} isGoodNet 公司局域网信号是否不稳定？（1是0否）
   * @param {String} infoSystems 公司有哪些信息系统？1,2,3,4
      1门户网站 
      2微信公众号	
      3 ERP系统	
      4门店销售系统	
      5 OA办公系统	
      6 HR人力资源系统	
      7其他系统
   * @param {Number} isEngineRoom 公司的是否有硬件服务器及机房？
      1无服务器及机房
      2有服务器但无标准机房
      3已有机房（5年以上）
      4新建机房（5年以内）
   * @param {String} otherSurveyinfo 其他需求说明
   */
  addsurvey({
    companyId,
    netCnt,
    isInterNet,
    isNetPerson,
    interCondition,
    isClockin,
    isCertificate,
    isGoodWifi,
    isContact,
    isManyWifi,
    isGoodNet,
    infoSystems,
    isEngineRoom,
    otherSurveyinfo
  }) {
    let params = {
      companyId,
      netCnt,
      isInterNet,
      isNetPerson,
      interCondition,
      isClockin,
      isCertificate,
      isGoodWifi,
      isContact,
      isManyWifi,
      isGoodNet,
      infoSystems,
      isEngineRoom,
      otherSurveyinfo
    }
    return request({
      url: '/shenyang/company/addsurvey',
      method: 'post',
      params
    })
  },
  /**
   * 获取 业务信息列表 数据
   * @param {Number} companyId 企业客户 id
   * @param {Number} pageNum 页码
   * @param {Number} pageSize 每页展示的数字
   */
  getcompanyBusiness({
    companyId,
    pageNum,
    pageSize
  }) {
    let params = {
      companyId,
      pageNum,
      pageSize
    }
    return request({
      url: '/shenyang/company/getcompanyBusiness',
      method: 'get',
      params
    })
  },
  /**
   * 更新 单条业务信息 数据
   * @param {Number} serviceId 业务 id
   * @param {Number} busiId 业务类型
      1 宽带
      2 固话
      3 移动
      4 天翼高清
   * @param {String} busiProvider 业务提供商
   * @param {String} otherManagerName 异网客户经理
   * @param {String} otherManagerPhone 异网客户经理联系方式
   * @param {String} busiEndDate 业务到期时间 2019-11-08
   */
  updatecompanyBusiness({
    serviceId,
    busiId,
    busiProvider,
    otherManagerName,
    otherManagerPhone,
    busiEndDate
  }) {
    let params = {
      serviceId,
      busiId,
      busiProvider,
      otherManagerName,
      otherManagerPhone,
      busiEndDate
    }
    return request({
      url: '/shenyang/company/updatecompanyBusiness',
      method: 'post',
      params
    })
  },
  /**
   * 删除 单条业务信息 数据
   * @param {Number} serviceId 业务 id
   */
  deletecompanyBusiness({
    serviceId
  }) {
    let params = {
      serviceId,
    }
    return request({
      url: '/shenyang/company/deletecompanyBusiness',
      method: 'get',
      params
    })
  },

/** ·····································铁三角······································ */
  /**
   * 搜索查询 客户经理
   * @param {*} params 
   */
  getManager(params) {
    return request({
      url: '/crm/customer/getManager',
      method: 'get',
      params
    })
  },

  /**
   * 铁三角->查询经理人列表
   * @param { customerId } 客户经理id 
   */
  getManagers(params) {
    return request({
      url: '/customer/info/collection/getManagers',
      method: 'get',
      params
    })
  },

  /**
   * 铁三角->新增经理
   * @param { 
   * customerId     客户编码
   * customerName   客户名称
   * managerArea    经理所属区域
   * managerCode    经理人力编码
   * managerId      经理编码
   * managerName    经理名称
   * managerType    经理类型
   * } data 
   */
  addManager(params) {
    return request({
      url: '/customer/info/collection/addManager',
      method: 'post',
      params
    })
  },
  
  /**
   * 铁三角->删除经理人
   * @param {*} params 
   */
  deleteManager(params) {
    return request({
      url: '/customer/info/collection/deleteManager',
      method: 'DELETE',
      params
    })
  },
  /**
   * 
   * @param {*} params 
   */
  updateManager(params){
    return request({
      url: '/customer/info/collection/updateManager',
      method: 'PUT',
      params
    })
  },
  
  /** ······························关键人································· */

  /**
   *  
   * @param {
   * customerId       客户编码
   * customerName     客户名称
   * keyPersonName    关键人姓名
   * keyPersonPhone   关键人联系方式
   * keyPersonType    关键人类型
   * } params 
   */
  addKeyPerson(params) {
    return request({
      url: '/customer/info/collection/addKeyPerson',
      method: 'post',
      params
    })
  },

  /**
   * 查询关键人列表
   * @param { customerId } params 
   */
  getKeyPersons(params) {
    return request({
      url: '/customer/info/collection/getKeyPersons',
      method: 'get',
      params
    })
  },
  /**
   * 删除关键人
   * @param {*} params 
   */
  deleteKeyPerson(params) {
    return request({
      url: '/customer/info/collection/deleteKeyPerson',
      method: 'delete',
      params
    })
  },
  /**
   * 修改关键人
   * @param {*} params 
   */
  updateKeyPerson(params) {
    return request({
      url: '/customer/info/collection/updateKeyPerson',
      method: 'PUT',
      params
    })
  },
  /**
   * 
   * @param {
    * customerId,  // 客户ID
    * keyPersonPhone // 手机或座机号
    * } params 
    */
   checkKeyPersonPhone(params) {
     return request({
       url: '/customer/info/collection/checkKeyPersonPhone',
       method: 'get',
       params
     })
   },
}

