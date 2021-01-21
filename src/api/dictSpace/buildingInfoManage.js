// 楼宇信息管理 页面接口
import request from '@/utils/request'
import qs from 'qs'

export const buildingInfoManage = {
  /**
   * 获取 楼宇信息完整率 数据
   */
  getBuildInformationIntegrityRate() {
    return request({
      url: '/shenyang/building/getBuildInformationIntegrityRate',
      method: 'get'
    })
  },
  /**
   * 获取 楼宇列表信息 数据
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
   * 获取 单个楼宇的详情数据
   * @param {Number} id 楼宇 id
   */
  getbuildingbyid({
    id
  }) {
    let params = {
      id
    }
    return request({
      url: '/shenyang/building/getbuildingbyid',
      method: 'get',
      params
    })
  },
  /**
   * 更新单个楼宇的信息
   * @param {Number} bldg_id 楼宇 id
   * @param {Number} bldg_type 楼宇类型
   * 1001 城区住宅
      1002 商务楼宇
      1003 工业园区
      1004 专业市场
      1005 农村住宅
      1006 厂区宿舍
      1007 自有楼宇
      1008 沿街店铺
   * @param {String} bldg_roperty 楼宇物管公司
   * @param {String} bldg_area 楼宇包含范围
   * @param {Number} is_ptnr 电信是否与物管有合作分成协议 1 || 0
   */
  updatebuilding({
    bldg_id,
    bldg_type,
    bldg_roperty,
    bldg_area,
    is_ptnr
  }) {
    let params = {
      bldg_id,
      bldg_type,
      bldg_roperty,
      bldg_area,
      is_ptnr
    }
    return request({
      url: '/shenyang/building/updatebuilding',
      method: 'post',
      params
      // data: qs.stringify(params),
      // headers: {
      //   'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      // }
    })
  },
  /**
   * 获取 单个楼宇的更新历史数据
   * @param {Number} id 楼宇 id
   */
  getbuildinghistory({
    id
  }) {
    let params = {
      id
    }
    return request({
      url: '/shenyang/building/getbuildinghistory',
      method: 'get',
      params
    })
  },
  /**
   * 获取 企业客户查询
   * @param {Number} bldgId 楼宇 id
   * @param {Number} pageNum 页码
   * @param {Number} pageSize 每页展示的数字
   * @param {String} searchValue 要查找的企业客户名称
   */
  getcompanybybldgidandname({
    bldgId,
    pageNum,
    pageSize,
    searchValue
  }) {
    let params = {
      pageNum,
      pageSize,
      searchValue,
      bldgId
    }
    return request({
      url: '/shenyang/company/getcompanybybldgidandname',
      method: 'get',
      params
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
      * @param {String} busiId 业务类型
      * 1 宽带
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
   * 获取 单个企业客户的更新历史
   * @param {Number} id 企业客户ID
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
   * 获取 联系人表格 数据
   * @param {Number} bldgId 楼宇 id
   * @param {Number} pageNum 页码
   * @param {Number} pageSize 每页展示的数字
   */
  getbuildingcontact({
    pageNum,
    pageSize,
    bldgId
  }) {
    let params = {
      pageNum,
      pageSize,
      bldgId
    }
    return request({
      url: '/shenyang/buildingcontact/getbuildingcontact',
      method: 'get',
      params
    })
  },
  /**
   * 删除 单个联系人 数据
   * @param {Number} contactId 联系人 id
   */
  deletebuildingcontact({
    contactId
  }) {
    let params = {
      contactId
    }
    return request({
      url: '/shenyang/buildingcontact/deletebuildingcontact',
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
  updatebuildingcontact({
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
      url: '/shenyang/buildingcontact/updatebuildingcontact',
      method: 'post',
      params
    })
  },
  /**
   * 添加 单个联系人
   * @param {Number} bldg_id 楼宇 id
   * @param {String} contact_name 联系人名称
   * @param {String} contact_gender 联系人性别(1男，2女，3未知)
   * @param {String} contast_phone 联系人电话
   * @param {String} contact_pstn 联系人岗位
   */
  addbuildingcontact({
    bldg_id,
    contact_name,
    contact_gender,
    contact_phone,
    contact_pstn
  }) {
    let params = {
      bldg_id,
      contact_name,
      contact_gender,
      contact_phone,
      contact_pstn
    }
    return request({
      url: '/shenyang/buildingcontact/addbuildingcontact',
      method: 'post',
      params
    })
  },
  /**
   * 获取 楼宇视图 四个总数
   * @param {Number} bldgId 楼宇 id
   */
  getbuildingview({
    bldgId
  }) {
    let params = {
      bldgId
    }
    return request({
      url: '/shenyang/building/getbuildingview',
      method: 'get',
      params
    })
  },
  /**
   * 根据单元号获取相应的房间列表
   * @param {Number} bldgId 楼宇 id
   * @param {String} cellId 楼宇单元
   */
  getRoomByCell({
    bldgId,
    cellId
  }) {
    let params = {
      bldgId,
      cellId
    }
    return request({
      url: '/shenyang/building/getRoomByCell',
      method: 'get',
      params
    })
  },
  /**
   * 获取 单元列表 数据
   * @param {Number} bldgId 楼宇 id
   */
  getUnitList({
    bldgId
  }) {
    let params = {
      bldgId
    }
    return request({
      url: '/shenyang/building/getUnitList',
      method: 'get',
      params
    })
  },
  /**
   * 根据单元号获取相应的房间列表
   * @param {Number} bldgId 楼宇 id
   * @param {String} cellId 楼宇单元
   */
  getRoomByCell({
    bldgId,
    cellId
  }) {
    let params = {
      bldgId,
      cellId
    }
    return request({
      url: '/shenyang/building/getRoomByCell',
      method: 'get',
      params
    })
  },
  /**
   * 根据房间号获取相应的房间信息
   * @param {Number} bldgId 楼宇 id
   * @param {String} cellId 楼宇单元
   * @param {String} tenementId 房间号
   */
  getRoomMessage({
    bldgId,
    cellId,
    tenementId
  }) {
    let params = {
      bldgId,
      cellId,
      tenementId
    }
    return request({
      url: '/shenyang/building/getRoomMessage',
      method: 'get',
      params
    })
  },
  /**
   * 获取 异网竞争信息 数据
   * @param {Number} bldgId 楼宇 id
   */
  getCompetitor({
    bldgId
  }) {
    let params = {
      bldgId
    }
    return request({
      url: '/shenyang/building/getCompetitor',
      method: 'get',
      params
    })
  },
  /**
   * 提交 异网竞争信息 表单数据
   * @param {Number} bldgId 楼宇 id
   * @param {Array} otherNetChannel 渠道信息所填列表数据
   * @param {Array} serviceProvider 运营商资源情况所填列表数据
   * @param {Array} otherNetCustomer 异网客户经理所填列表数据
   */
  addCompetitor({
    bldgId,
    otherNetChannel,
    serviceProvider,
    otherNetCustomer
  }) {
    let params = {
      bldgId,
      otherNetChannel,
      serviceProvider,
      otherNetCustomer
    }
    return request({
      url: '/shenyang/building/addCompetitor',
      method: 'post',
      data: params
    })
  }
}
