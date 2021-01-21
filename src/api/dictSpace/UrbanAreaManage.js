// 城市区域 页面接口
import request from '@/utils/request'
import qs from 'qs'

export const UrbanAreaManage = {
  /**
   * 查询完善数量和信息完整率
   * @param {String} areaId 区域编码
   */
  getUrbanAreaManageIntegrityRate({
    areaId
  }) {
    let params = {
      areaId
    }
    return request({
      url: '/zone/manage/getPerfectCntAndRate',
      method: 'get',
      params
    })
  },
  /**
   * 空间树信息
   * @param {String} areaId 区域编码
   * @param {String} zoneName 模糊搜索名称
   * @param {String} perfectType
   */
  geturbanbyname({
    areaId,
    zoneName,
    perfectType
  }) {
    let params = {
      areaId,
      zoneName,
      perfectType
    }
    return request({
      url: '/zone/manage/getZoneTreeByName',
      method: 'get',
      params
    })
  },
  /**
   * 空间树子节点
   * @param {String} areaId 区域编码
   * @param {String} zoneName 模糊搜索名称
   * @param {String} perfectType
   * @param {String} parentZoneId 上级空间编码
   * @param {String} parentZoneTypeId 上级空间类型编码
   */
  getChildZones({
    areaId,
    zoneName,
    perfectType,
    parentZoneId,
    parentZoneTypeId
  }){
    let params = {
      perfectType,
      zoneName,
      areaId,
      parentZoneId,
      parentZoneTypeId
    }
    return request({
      url: '/zone/manage/getChildZones',
      method: 'get',
      params
    })
  },
  /**
   * 包区或网格下所有子节点数量
   * @param {String} zoneId 空间编码
   * @param {String} zoneTypeId 空间类型编码
   */
  getChildCnt({
    zoneId,
    zoneTypeId
  }){
    let params = {
      zoneId,
      zoneTypeId
    }
    return request({
      url: '/zone/manage/getChildCnt',
      method: 'get',
      params
    })
  },
  /**
   * 基本信息
   * @param {String} zoneId 空间编码
   * @param {String} zoneTypeId 空间类型编码
   */
  getZoneBaseInfo({
    zoneId,
    zoneTypeId
  }){
    let params = {
      zoneId,
      zoneTypeId
    }
    return request({
      url: '/zone/manage/getZoneBaseInfo',
      method: 'get',
      params
    })
  },
  /**
   * 编辑基本信息-保存
   * @param {String} zoneId 空间编码
   * @param {String} zoneName 空间名称
   * @param {String} zoneTypeId 空间类型编码
   */
  updateBaseInfo({
    zoneName,
    zoneId,
    zoneTypeId
  }){
    let params = {
      zoneName,
      zoneId,
      zoneTypeId
    }
    return request({
      url: '/zone/manage/updateBaseInfo',
      method: 'post',
      params
    })
  },
  /**
   * 编辑基本信息-拿回
   * @param {String} zoneId 空间编码
   * @param {String} zoneTypeId 空间类型编码
   */
  updateBaseInfoReset({
    zoneId,
    zoneTypeId
  }){
    let params = {
      zoneId,
      zoneTypeId
    }
    return request({
      url: '/zone/manage/updateBaseInfoReset',
      method: 'post',
      params
    })
  },
  /**
   * 市场空间信息
   * @param {String} zoneId 空间编码
   * @param {String} zoneTypeId 空间类型编码
   */
  getZoneMarketInfo({
    zoneId,
    zoneTypeId
  }){
    let params = {
      zoneId,
      zoneTypeId
    }
    return request({
      url: '/zone/manage/getZoneMarketInfo',
      method: 'get',
      params
    })
  },
  /**
   * 市场空间信息-保存
   * @param {String} zoneId 空间编码
   * @param {Long} zoneTypeId 空间类型编码
   * @param {int} roomCnt 房屋套数
   * @param {int} famCnt 住户数
   * @param {int} peoCnt 人口数
   * @param {int} busiCnt 商户数
   */
  updateMarketInfo({
    zoneId,
    zoneTypeId,
    roomCnt,
    famCnt,
    peoCnt,
    busiCnt
  }){
    let params = {
      zoneId,
      zoneTypeId,
      roomCnt,
      famCnt,
      peoCnt,
      busiCnt
    }
    return request({
      url: '/zone/manage/updateMarketInfo',
      method: 'post',
      params
    })
  },
  /**
   * 市场空间信息-拿回
   * @param {String} zoneId 空间编码
   * @param {Long} zoneTypeId 空间类型编码
   */
  updateMarketInfoReset({
    zoneId,
    zoneTypeId
  }){
    let params = {
      zoneId,
      zoneTypeId
    }
    return request({
      url: '/zone/manage/updateMarketInfoReset',
      method: 'post',
      params
    })
  },
  /**
   * 本网业务信息
   * @param {String} zoneId 空间编码
   * @param {String} zoneTypeId 空间类型编码
   */
  getZoneNetInfo({
    zoneId,
    zoneTypeId
  }){
    let params = {
      zoneId,
      zoneTypeId
    }
    return request({
      url: '/zone/manage/getZoneNetInfo',
      method: 'get',
      params
    })
  },
  /**
   * 下级列表
   * @param {String} zoneId 空间编码
   * @param {String} zoneTypeId 空间类型编码
   * @param {Number} pageNum
   * @param {Number} pageSize
   */
  getChildList({
    zoneId,
    zoneTypeId,
    pageNum,
    pageSize
  }){
    let params = {
      zoneId,
      zoneTypeId,
      pageNum,
      pageSize
    }
    return request({
      url: '/zone/manage/getChildList',
      method: 'get',
      params
    })
  },
  /**
   * 统计分析-各业务计费到达情况
   * @param {String} zoneId 空间编码
   * @param {String} zoneTypeId 空间类型编码
   * @param {String} monthId 账期
   */
  getTopLeftBar({
    zoneId,
    zoneTypeId,
    monthId
  }){
    let params = {
      zoneId,
      zoneTypeId,
      monthId
    }
    return request({
      url: '/zone/manage/getTopLeftBar',
      method: 'get',
      params
    })
  },
  /**
   * 统计分析-各业务发展情况
   * @param {String} zoneId 空间编码
   * @param {String} zoneTypeId 空间类型编码
   */
  getTopRightBar({
    zoneId,
    zoneTypeId
  }){
    let params = {
      zoneId,
      zoneTypeId
    }
    return request({
      url: '/zone/manage/getTopRightBar',
      method: 'get',
      params
    })
  },
  /**
   * 统计分析-各业务收入占比
   * @param {String} zoneId 空间编码
   * @param {String} zoneTypeId 空间类型编码
   * @param {String} monthId 账期
   */
  getBottomLeftPie({
    zoneId,
    zoneTypeId,
    monthId
  }){
    let params = {
      zoneId,
      zoneTypeId,
      monthId
    }
    return request({
      url: '/zone/manage/getBottomLeftPie',
      method: 'get',
      params
    })
  },
  /**
   * 统计分析-光端口使用情况
   * @param {String} zoneId 空间编码
   * @param {String} zoneTypeId 空间类型编码
   */
  getBottomRightLiquidFill({
    zoneId,
    zoneTypeId,
    monthId
  }){
    let params = {
      zoneId,
      zoneTypeId,
      monthId
    }
    return request({
      url: '/zone/manage/getBottomRightLiquidFill',
      method: 'get',
      params
    })
  },
  /**
   * 查询空间类型下拉列表
   * @param {String} zoneTypeFlag 空间类型标识 1网格 2小区 3楼宇
   */
  getZoneType({
    zoneTypeFlag
  }){
    let params = {
      zoneTypeFlag
    }
    return request({
      url: '/zone/manage/getZoneType',
      method: 'get',
      params
    })
  },
  /**
   * 新增空间
   * @param {String} zoneName 空间名称
   * @param {Long} zoneTypeId 空间类型编码
   * @param {String} zoneAddress 空间地址
   * @param {Long} parentZoneId 上级空间编码
   * @param {String} upUnit 上级经营单元
   */
  addZone({
    zoneName,
    zoneTypeId,
    zoneAddress,
    parentZoneId,
    upUnit
  }){
    let params = {
      zoneName,
      zoneTypeId,
      zoneAddress,
      parentZoneId,
      upUnit
    }
    return request({
      url: '/zone/manage/addZone',
      method: 'post',
      params
    })
  },
  /**
   * 查询异网竞争信息
   * @param {String} zoneId 空间编码
   */
  getOtherNetCompetitions({
    zoneId
  }){
    let params = {
      zoneId
    }
    return request({
      url: '/zone/manage/getOtherNetCompetition',
      method: 'get',
      params
    })
  },
  /**
   * 编辑异网竞争信息-保存
   * @param {String} zoneId 空间编码
   * @param {int} typeId 异网竞争分类编码
   * @param {int} cptrType 异网进驻情况（1：联通 2：移动 3：华数 4：其他）
   * @param {String} channelInfo 渠道信息描述
   * @param {int} userCnt 用户数
   * @param {String} otherManager 异网客户经理姓名
   * @param {String} otherManagerTel 异网客户经理联系方式
   */
  addOtherNetCompetition(data){
    return request({
      url: '/zone/manage/addOtherNetCompetition',
      method: 'post',
      data: data
    })
  },
  /**
   * 编辑异网竞争信息-拿回
   * @param {String} zoneId 空间编码
   */
  updateOtherNetCompetition({
    zoneId
  }){
    let params = {
      zoneId
    }
    return request({
      url: '/zone/manage/updateOtherNetCompetition',
      method: 'post',
      params
    })
  },
  /**
   * 查询营销信息
   * @param {String} zoneId 空间编码
   */
  getMarketingInfos({
    zoneId
  }){
    let params = {
      zoneId
    }
    return request({
      url: '/zone/manage/getMarketingInfo',
      method: 'get',
      params
    })
  },
  /**
   * 编辑营销信息
   * @param {String} zoneId 空间编码
   * @param {String} deliveryTime 楼盘交付时间
   * @param {String} owner 小区责任人
   * @param {String} pairStore 结对门店
   * @param {String} pmc 物业公司
   * @param {String} pmcStaff 物业联系人
   * @param {String} pmcStaffTel 物业联系方式
   */
  updateMarketingInfo({
    zoneId,
    deliveryTime,
    owner,
    pairStore,
    pmc,
    pmcStaff,
    pmcStaffTel
  }){
    let params = {
      zoneId,
      deliveryTime,
      owner,
      pairStore,
      pmc,
      pmcStaff,
      pmcStaffTel
    }
    return request({
      url: '/zone/manage/updateMarketingInfo',
      method: 'post',
      params
    })
  },
  /**
   * 历史更新
   * @param {String} zoneId 空间编码
   */
  getUpdateHistory({
    zoneId
  }){
    let params = {
      zoneId
    }
    return request({
      url: '/zone/manage/getUpdateHistory',
      method: 'get',
      params
    })
  },
  /**
   * 查询客户清单
   * @param {String} zoneId 空间编码
   * @param {String} customerName 客户名称（模糊搜索）
   */
  getCustomerList({
    zoneId,
    customerName
  }){
    let params = {
      zoneId,
      customerName
    }
    return request({
      url: '/zone/manage/getCustomerList',
      method: 'get',
      params
    })
  },
  /**
   * 楼宇视图-四个指标
   * @param {String} zoneId 空间编码
   */
  getBuilingViewTopValue({
    zoneId
  }){
    let params = {
      zoneId
    }
    return request({
      url: '/zone/manage/getBuilingViewTopValue',
      method: 'get',
      params
    })
  },
  /**
   * 楼宇视图-单元列表
   * @param {String} zoneId 空间编码
   */
  getBuildingViewCells({
    zoneId
  }){
    let params = {
      zoneId
    }
    return request({
      url: '/zone/manage/getBuildingViewCells',
      method: 'get',
      params
    })
  },
  /**
   * 楼宇视图-房间列表
   * @param {String} zoneId 空间编码
   * @param {String} cellId 单元号
   */
  getBuildingView({
    zoneId,
    cellId
  }){
    let params = {
      zoneId,
      cellId
    }
    return request({
      url: '/zone/manage/getBuildViewRooms',
      method: 'get',
      params
    })
  },
  /**
   * 楼宇视图-某个房间的客户列表
   * @param {String} zoneId 空间编码
   * @param {String} cellId 单元号
   * @param {String} roomId 房间
   */
  getRoomCustomerList({
    zoneId,
    cellId,
    roomId
  }){
    let params = {
      zoneId,
      cellId,
      roomId
    }
    return request({
      url: '/zone/manage/getRoomCustomerList',
      method: 'get',
      params
    })
  },
  /**
   * 查询企业客户类型
   */
  getCustomerType(){
    return request({
      url: '/zone/manage/getCustomerType',
      method: 'get'
    })
  },
  /**
   * 查询业务类型
   */
  getBusinessType(){
    return request({
      url: '/zone/manage/getBusinessType',
      method: 'get'
    })
  },
  /**
   * 添加客户
   * 
   * 基本信息
   * @param {String} zoneId 空间编码
   * @param {String} customerName 客户名称
   * @param {String} customerAddr 客户地址
   * @param {String} customerType 客户类型
   * @param {String} busiScale 营业额规模
   * @param {String} officeSpace 办公面积
   * @param {String} staffCnt 公司人数规模
   * @param {String} companyTel 公司电话
   * @param {String} buildingFloor 企业楼层
   * @param {String} cellId 单元号
   * @param {String} roomId 房间号
   * 增量业务信息：business
   * @param {String} busiId 业务类型
   * @param {String} busiProvider 业务提供商
   * @param {String} otherManagerName 异网客户经理
   * @param {String} otherManagerPhone 联系方式
   * @param {String} busiEndDate 到期时间（yyyy-MM-dd）
   */
  addCustomer(data){
    return request({
      url: '/zone/manage/addCustomer',
      method: 'post',
      data: data
    })
  },
  /**
   * 查询客户更新历史
   * @param {String} customerId
   */
  getCustomerHistory({
    customerId
  }){
    let params = {
      customerId
    }
    return request({
      url: '/zone/manage/getCustomerHistory',
      method: 'get',
      params
    })
  }
}