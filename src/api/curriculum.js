import request from '@/utils/request'

export const curriculum = {
  /** 
   * 获取课程
   */
   courseage() {
    return request({
      url: '/course/courseage',
      method: 'get'
    })
  },
  /** 
   * 获取综合列表
   */
   sort() {
    return request({
      url: '/practice/synthetical/sort',
      method: 'get'
    })
  },
  /** 
   * 获取综合分类
   */
   directory(sort) {
    return request({
      url: '/practice/synthetical/directory/' + sort,
      method: 'get'
    })
  },
  /** 
   * 获取试卷习题
   */
   paperOne(paperid) {
    return request({
      url: '/practice/paper/' + paperid,
      method: 'get'
    })
  },
  /** 
   * 创建课程
   */
   createCourse(data) {
    return request({
      url: '/course/create',
      method: 'post',
      data: data
    })
  },
  /**
   * 上传封面
   * @param formData 
   */
   uploadCourse(formData) {
    return request({
      url: '/course/images/upload',
      method: 'post',
      data: formData
    })
  },
  /** 
   * 获取课程章节
   */
   videoCourse(courseid) {
    return request({
      url: '/course/video/' + courseid,
      method: 'get'
    })
  },
  /**
   * 上传视频
   * @param formData 
   */
   uploadVideo(formData) {
    return request({
      url: '/course/video/upload',
      method: 'post',
      data: formData
    })
  },
  /** 
   * 创建课程视频
   * @param videotitle（视频标题）
   * @param videocontext（视频简介）
   * @param videoaddress（视频地址）
   * @param courseid
   * @param videochapter（章节1,2,3）
   */
   createVideo(data) {
    return request({
      url: '/course/video/create',
      method: 'post',
      data: data
    })
  },
  /** 
   * 查询课程
   */
   searchCourse(search) {
    let data = {
        search
    }
    return request({
      url: '/search',
      method: 'post',
      data: data
    })
  },
  /** 
   * 创建试卷
   * @param papertitle data.papertitle试卷标题-如果是video试题，这里根据videoid获取对应的title+chapter改成格式例如第1节 章节名字；如果是分类，写成HTML综合练习一或者其他格式
   * @param {Int} papertype 如果video，2，分类是1
   * @param videoid 如果video传入videoid，分类传入NULL
   * @param papersort 如果是video传入NULL，分类传入分类名如HTML
   */
   createPaper(papertitle, papertype, videoid, papersort) {
    let data = {
        papertitle,
        papertype,
        videoid,
        papersort
    }
    return request({
      url: '/practice/create/paper',
      method: 'post',
      data: data
    })
  },
  /** 
   * 试卷习题添加
   * @param practicequestion 习题问题
   * @param practiceanswer 习题答案单选A; 多选A,B(同样.split(';'))；简答：直接写答案
   * @param paperid 试卷id
   * @param {Int} practicetype 习题分类，1单选，2多选，3简答
   * @param practiceanother 单选多选：A:选项a;B:选项b;C:选项c; 各个选项用英文分号隔开; 简答：答案解析
   * @param {Int} practiceindex 题号
   */
   createPractice(data) {
    return request({
      url: '/practice/create/practice',
      method: 'post',
      data: data
    })
  },
  /** 
   * 删除课程
   * @param courseid
   */
   deleteCourse(courseid) {
     let data = {
      courseid
     }
    return request({
      url: '/course/delete',
      method: 'post',
      data: data
    })
  },
  /** 
   * 修改课程
   */
   updateCourse(data) {
    return request({
      url: '/course/update',
      method: 'post',
      data: data
    })
  },
  /** 
   * 删除视频
   * @param videoid 
   */
   deleteVideo(videoid) {
    let data = {
      videoid
    }
   return request({
     url: '/course/video/delete',
     method: 'post',
     data: data
   })
 },
 /** 
  * 修改视频
  */
  updateVideo(data) {
   return request({
     url: '/course/video/update',
     method: 'post',
     data: data
   })
 },
 /** 
   * 删除试卷
   * @param paperid 
   */
  deletePaper(paperid) {
    let data = {
      paperid
    }
   return request({
     url: '/practice/delete/paper',
     method: 'post',
     data: data
   })
 },
 /** 
  * 修改试卷
  */
  updatePaper(data) {
   return request({
     url: '/practice/update/paper',
     method: 'post',
     data: data
   })
 },
 /** 
   * 删除习题
   * @param practiceid 
   */
  deletePratice(practiceid) {
    let data = {
      practiceid
    }
   return request({
     url: '/practice/delete/practice',
     method: 'post',
     data: data
   })
 },
 /** 
  * 修改习题
  */
  updatePratice(data) {
   return request({
     url: '/practice/update/practice',
     method: 'post',
     data: data
   })
 },
 /** 
  * 图形化练习列表
  */
  getProgram() {
    return request({
      url: '/program/all',
      method: 'get'
    })
  },
  /** 
  * 图形化练习-增加
  */
   addProgram(data) {
    return request({
      url: '/program/create',
      method: 'post',
      data: data
    })
  },
  /** 
  * 图形化练习-删除
  */
   delProgram(programid) {
     let data = {
       programid
     }
    return request({
      url: '/program/delete',
      method: 'post',
      data: data
    })
  },
  /** 
  * 图形化练习-修改
  */
   updateProgram(data) {
    return request({
      url: '/program/update',
      method: 'post',
      data: data
    })
  },
}