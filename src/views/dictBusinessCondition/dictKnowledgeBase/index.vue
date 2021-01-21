<template lang="pug">
//- 政企知识库
.dict-knowledge-base
  transition(name="knowledge")
    .knowledge-document(v-if="show")
      .leftBox
        .title 文档分类
        .itemList 
          .item(@click="clicktab(1)" :class="{'is-active' : 1==tab}") 产品业务（{{productLibraryCount}}）
          .item(@click="clicktab(2)" :class="{'is-active' : 2==tab}") 案例分享（{{caseLibraryCount}}） 
          .item(@click="clicktab(3)" :class="{'is-active' : 3==tab}") 解决方案（{{solutionLibraryCount}}）

      .rightBox
        .selectBox
          el-input(placeholder="请输入文件名称搜索" v-model="queryParams.productName" clearable @keyup.enter.native="handleQuery" )
          el-button(type="primary" icon="el-icon-search")( @click="handleQuery") 查 询
          // el-button(type="text") 高级搜索
        .docBox
          .title
            span 政企知识文档
            el-button(type="primary" icon="el-icon-plus" @click="addDocument") 添加文档
          .docItemList(v-if="tab == 1" v-loading="loading")
            .item(v-for="(item,i) in list") 
              .item-img
                img(src="./icons/icon-file.png")
              .item-body
                .body-title
                  span.name {{ item.productName }}
                  el-tag(effect="plain") {{ item.productCategory == 1 ? '中小酒店': item.productCategory == 2 ? '商贸连锁': item.productCategory == 3 ? '中小学': item.productCategory == 4 ? '集宿区':''}}
                .body-explain {{ item.productContent }}
                            
                .body-footer
                  span #[i(class="el-icon-user")] {{ item.creatorName }} 
                  span #[i(class="el-icon-time")] {{item.createTime}}
                  span #[i(class="el-icon-download")] 下载次数：{{item.statistics}}
              .item-operation
                el-button(size="small" icon="el-icon-download" round @click="downloadDocument( item.productPapers,item.productId )") 下载文档
                el-button(size="small" icon="el-icon-delete" round  @click="deleteProduct( item.productId )") 删除文档
          .docItemList(v-if="tab == 2" v-loading="loading")
            .item(v-for="(item,i) in list") 
              .item-img
                img(src="./icons/icon-file.png")
              .item-body
                .body-title
                  span.name {{ item.caseName }}
                  el-tag(effect="plain") {{ item.caseCategory == 1 ? '中小酒店': item.caseCategory == 2 ? '商贸连锁': item.caseCategory == 3 ? '中小学': item.caseCategory == 4 ? '集宿区':''}}
                .body-explain {{ item.caseContent }}
                            
                .body-footer
                  span #[i(class="el-icon-user")] {{ item.creatorName }} 
                  span #[i(class="el-icon-time")] {{item.createTime}}
                  span #[i(class="el-icon-download")] 下载次数：{{item.statistics}}
              .item-operation
                el-button(size="small" icon="el-icon-download" round @click="downloadDocument( item.casePapers,item.caseId )") 下载文档
                el-button(size="small" icon="el-icon-delete" round  @click="deleteCase( item.caseId )") 删除文档   
          .docItemList(v-if="tab == 3" v-loading="loading")
            .item(v-for="(item,i) in list") 
              .item-img
                img(src="./icons/icon-file.png")
              .item-body
                .body-title
                  span.name {{ item.solutionName }}
                  el-tag(effect="plain") {{ item.solutionCategory == 1 ? '中小酒店': item.solutionCategory == 2 ? '商贸连锁': item.solutionCategory == 3 ? '中小学': item.solutionCategory == 4 ? '集宿区':''}}
                .body-explain {{ item.solutionContent }}
                            
                .body-footer
                  span #[i(class="el-icon-user")] {{ item.creatorName }} 
                  span #[i(class="el-icon-time")] {{item.createTime}}
                  span #[i(class="el-icon-download")] 下载次数：{{item.statistics}}
              .item-operation
                el-button(size="small" icon="el-icon-download" round @click="downloadDocument( item.solutionPapers,item.solutionId )") 下载文档
                el-button(size="small" icon="el-icon-delete" round  @click="deleteSolution( item.solutionId )") 删除文档   
          .docFooter
            el-pagination(
              
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="pageNum"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="queryParams.pageSize"
              layout="sizes, prev, pager, next, jumper"
               v-show="total>0"
              :total="total" background)
  .add-knowledge-document(v-if="!show")
    .title(style="border-bottom: 1px solid #e9e9e9;")
      span 知识文档上传

    el-form.knowledgeBody(ref="uploadForm" :model="formData" :rules="formRules" label-width="120px" size="mini")
      el-form-item(label="上传文件：" required)
        el-upload(class="upload-demo" action="" ref="fileUpload" :http-request="uploadImport" :limit="1" :before-remove="handleFileUploadBeforeRemove" :on-remove="handleFileUploadRemove" :on-error="handleFileUploadError")
          el-button(type="primary") 点击上传
          div(slot="tip" class="el-upload__tip") 不能上传 .jpg/.jpeg/.png 文件
      el-form-item(label="知识名称：" prop="productName")
        el-input(v-model="formData.productName" placeholder="请输入内容")
      el-form-item(label="内容摘要：" prop="productContent")
        el-input(type="textarea" v-model="formData.productContent" placeholder="请输入内容" maxlength="200" :autosize="{ minRows: 6, maxRows: 6}" show-word-limit resize="none")
      el-form-item(label="知识分类：" prop="translation" required)
        span.radio-tag(v-for="(item, index) in tagListData.translation" :key="index" @click="translation(item.id)" :class="{'is-active' : item.id==formData.translation}") {{item.name}}
      el-form-item(label="业务标签：" prop="business")
        span.radio-tag(v-for="(item, index) in tagListData.business" :key="index" @click="business(item.id)" :class="{'is-active' : item.id==formData.business}") {{item.name}}
      el-form-item(label="标签类别：" prop="labelCategory")
        span.radio-tag(v-for="(item, index) in tagListData.labelCategory" :key="index" @click="labelCategory(item.id)" :class="{'is-active' : item.id==formData.labelCategory}") {{item.name}}
      el-form-item(label="行业分类：" prop="labelCategory")
        el-select(v-model="formData.industryParent" placeholder="一级词汇" @change="selectCountry")
          el-option(v-for="(item, index) in industryList"
          :key="index"
          :label="item.industryName"
          :value="item.industryCode")
        el-select(v-model="formData.industrySon" placeholder="二级词汇")
          el-option(v-for="(item, index) in childrenList"
          :key="index"
          :label="item.industryName"
          :value="item.industryCode")
      el-form-item
        el-button(type="primary" @click="onSubmitClick") 确定 
        el-button(@click="cancel") 取 消




            
    //- .knowledgeBody
    //-   .item
    //-     span.text 上传文件：
    //-     //- el-upload(class="upload-demo" action="" ref="fileUpload" accept=".xls, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" :http-request="uploadImport" :limit="1" 
    //-     //- :on-error	="handleFileUploadError")
    //-     //-   el-button(type="primary") 点击上传
    //-     //-   div(slot="tip" class="el-upload__tip") 只能上传 xls/excel 文件
    //-   .item
    //-     span.text 知识名称：
    //-     el-input(v-model="formData.productName" placeholder="请输入内容" style="width:280px")
    //-   .item
    //-     span.text 内容摘要：
    //-     el-input(type="textarea" placeholder="请输入内容" v-model="formData.productContent" maxlength="200"  :autosize="{ minRows: 6, maxRows: 6}" show-word-limit resize="none" style="width:400px")
    //-   .item
    //-     span.text 知识分类：
    //-     span.tag(v-for="(item, index) in tagListData.translation" :key="index" @click="translation(item.id)" :class="{'is-active' : item.id==formData.translation}") {{item.name}}
    //-     //- span.tag 产品标签
    //-   .item
    //-     span.text 业务标签：
    //-     span.tag(v-for="(item, index) in tagListData.business" :key="index" @click="business(item.id)" :class="{'is-active' : item.id==formData.business}") {{item.name}}
    //-     //- span.tag 商客
    //-   .item
    //-     span.text 标签类别：
    //-     span.tag(v-for="(item, index) in tagListData.labelCategory" :key="index" @click="labelCategory(item.id)" :class="{'is-active' : item.id==formData.labelCategory}") {{item.name}}
    //-     //- span.tag 商贸连锁
    //-     //- span.tag 中小学
    //-     //- span.tag 集宿区
    //-   .item
    //-     span.text 行业分类：
    //-     el-select(v-model="formData.industryParent" placeholder="一级词汇" @change="selectCountry")
    //-       el-option(v-for="(item, index) in industry"
    //-       :key="index"
    //-       :label="item.industryName"
    //-       :value="item.industryCode")
    //-     el-select(v-model="formData.industrySon" placeholder="二级词汇")
    //-       el-option(v-for="(item, index) in children"
    //-       :key="index"
    //-       :label="item.industryName"
    //-       :value="item.industryCode")
    //-   .item
    //-     span.btn(@click="cancel") 取消
    //-     span.btn(@click="onSubmitClick") 上传
</template>
<script>
import {
  queryProductLibraryList,
  addUpload,
  addProductStatistics,
  insertProductLibrary,
  deleteProductStatistics,
  productLibraryCount,
  queryCaseLibraryList,
  insertCaseLibrary,
  addCaseStatistics,
  deleteCaseStatistics,
  querySolutionLibraryList,
  insertSolutionLibrary,
  addSolutionStatistics,
  deleteSolutionStatistics
} from "@/api/shengyang/repository";

export default {
  name: "DictKnowledgeBase",
  data() {
    return {
      loading: false,
      tab: 1,
      show: true,
      height: 0,
      fileName: "", //搜索的文件名称
      pageNum: 1, //当前页
      formData: {
        //上传文件数据
        productId: "",
        productName: "",
        productContent: "",
        productPapers: "",
        translation: "", //知识分类
        business: "", //业务标签
        labelCategory: "", //标签类别
        industryParent: "", //行业分类1级
        industrySon: "" //行业分类2级
      },
      formRules: {
        productName: [
          { required: true, message: "知识名称不能为空", trigger: "blur" }
        ],
        productContent: [
          { required: true, message: "内容摘要不能为空", trigger: "blur" }
        ],
        productName: [
          { required: true, message: "知识名称不能为空", trigger: "blur" }
        ],
        translation: [
          { required: true, message: "知识分类不能为空", trigger: "blur" }
        ],
        business: [
          { required: true, message: "业务标签不能为空", trigger: "blur" }
        ],
        business: [
          { required: true, message: "业务标签不能为空", trigger: "blur" }
        ],
        labelCategory: [
          { required: true, message: "标签类别不能为空", trigger: "blur" }
        ],
        industryParent: [
          { required: true, message: "一级行业分类不能为空", trigger: "blur" }
        ],
        industrySon: [
          { required: true, message: "二级行业分类不能为空", trigger: "blur" }
        ]
      },
      total: 0,
      formTitle: "编辑", //表单标题
      dialogFormVisible: false, //对话框是否可见
      // 表格数据
      list: [],
      industryList: [], //行业分类一级
      childrenList: [], //行业分类二级
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        dictName: undefined,
        dictType: undefined,
        status: undefined
      },
      tagListData: {
        translation: [
          { id: "1", name: "细分市场" },
          { id: "2", name: "产品标签" }
        ],
        business: [{ id: "1", name: "行客" }, { id: "2", name: "商客" }],
        labelCategory: [
          { id: "1", name: "中小酒店" },
          { id: "2", name: "商贸连锁" },
          { id: "3", name: "中小学" },
          { id: "4", name: "集宿区" }
        ]
      },
      // industryParent: [{
      //     value: '选项1',
      //     label: '黄金糕'
      //   }, {
      //     value: '选项2',
      //     label: '双皮奶'
      //   }
      // ],
      // industrySon: [{
      //     value: '选项1',
      //     label: '黄金糕'
      //   }, {
      //     value: '选项2',
      //     label: '双皮奶'
      //   }
      // ],
      productLibraryCount: 0,
      caseLibraryCount: 0,
      solutionLibraryCount: 0
    };
  },
  created() {
    this.height = window.innerHeight;
    this.getLqueryProductLibraryListist();
    this.getProductCount();
    // setTimeout(()=>{
    //   document.getElementsByClassName("dict-knowledge-base")[0].style.height = `${this.height}px`
    // }, 1000)

    // console.log();
  },
  methods: {
    addDocument() {
      this.industryList = JSON.parse(
        localStorage.getItem("storageData")
      ).industry;
      //  this.industryParent = industry;
      //  this.industry.forEach(item =>{
      //      this.children = item.children;
      //       this.children.forEach(item2 =>{
      //           this.industrySon.push({
      //           industryName: item2.industryName,
      //           industryCode: item2.industryCode,
      //           pid: item.industryCode
      //       });
      //      })
      //  })
      //  console.log("缓存数据"+ this.industry);
      this.show = false;
    },
    selectCountry(value) {
      this.industryList.forEach(item => {
        if (item.industryCode == value) {
          this.childrenList = item.children;
          this.formData.industrySon = "";
        }
      });
    },
    /** 统计数量 */
    getProductCount() {
      productLibraryCount().then(response => {
        this.productLibraryCount = response.productLibraryCount;
        this.caseLibraryCount = response.caseLibraryCount;
        this.solutionLibraryCount = response.solutionLibraryCount;
      });
    },
    /** 知识库产品业务 列表 */
    getLqueryProductLibraryListist() {
      this.loading = true;
      queryProductLibraryList(this.queryParams)
        .then(response => {
          this.list = response.rows;
          this.list.forEach(element => {
            element.productPapers =
              process.env.VUE_APP_BASE_API + element.productPapers;
          });
          this.total = response.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    //下载
    downloadDocument(productPapers, productId) {
      window.location.href = productPapers;
      if (this.tab == 1) {
        addProductStatistics(productId).then(response => {
          if (response.code === 200) {
            this.getLqueryProductLibraryListist();
          } else {
            this.msgError(response.msg);
          }
        });
      } else if (this.tab == 2) {
        addCaseStatistics(productId).then(response => {
          if (response.code === 200) {
            this.getqueryCaseLibraryList();
          } else {
            this.msgError(response.msg);
          }
        });
      } else if (this.tab == 3) {
        addSolutionStatistics(productId).then(response => {
          if (response.code === 200) {
            this.getquerySolutionLibraryList();
          } else {
            this.msgError(response.msg);
          }
        });
      }
    },
    //删除
    deleteProduct(productId) {
      this.$confirm("是否确认删除?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return deleteProductStatistics(productId);
        })
        .then(() => {
          this.getLqueryProductLibraryListist();
          this.getProductCount();
          this.msgSuccess("删除成功");
        })
        .catch(function() {});
    },
    //上传
    onSubmitClick() {
      // debugger
      // if(this.fileName == ""){
      // this.$message.warning('请选择要上传的文件！')
      // return false
      // }
      if (this.formData.productPapers == "") {
        this.$message.warning("请选择要上传的文件！");
        return false;
      }

      // 验证表单
      this.$refs["uploadForm"].validate(valid => {
        if (valid) {
          let fileFormData = new FormData();
          fileFormData.append("file", this.files, this.formData.productName); //filename是键，file是值，就是要传的文件，test.zip是要传的文件名
          addUpload(fileFormData).then(response => {
            //debugger
            if (response.code === 200) {
              this.productAdd(response.fileName);
            } else {
              this.msgError(response.msg);
            }
          });
        }
      });
    },
    productAdd(productPapers) {
      this.formData.productPapers = productPapers;

      if (this.formData.translation == "") {
        this.$message.warning("请选择知识分类！");
        return false;
      } else if (this.formData.business == "") {
        this.$message.warning("请选择业务标签！");
        return false;
      } else if (this.formData.labelCategory == "") {
        this.$message.warning("请选择标签类别！");
        return false;
      } else if (this.formData.industryParent == "") {
        this.$message.warning("请选择行业分类！");
        return false;
      } else if (this.formData.industrySon == "") {
        this.$message.warning("请选择行业分类！");
        return false;
      }
      if (this.tab == 1) {
        insertProductLibrary(this.formData).then(response => {
          if (response.code === 200) {
            this.msgSuccess("新增成功");
            this.open = false;
            this.getLqueryProductLibraryListist();
            this.getProductCount();
            this.cancel();
          } else {
            this.msgError(response.msg);
          }
        });
      } else if (this.tab == 2) {
        insertCaseLibrary(this.formData).then(response => {
          if (response.code === 200) {
            this.msgSuccess("新增成功");
            this.open = false;
            this.getqueryCaseLibraryList();
            this.getProductCount();
            this.cancel();
          } else {
            this.msgError(response.msg);
          }
        });
      } else if (this.tab == 3) {
        insertSolutionLibrary(this.formData).then(response => {
          if (response.code === 200) {
            this.msgSuccess("新增成功");
            this.open = false;
            this.getquerySolutionLibraryList();
            this.getProductCount();
            this.cancel();
          } else {
            this.msgError(response.msg);
          }
        });
      }
    },
    /**
     * 组件上传文件回调
     */
    uploadImport(params) {
      let { file } = params;
      this.files = file;
      const fileType = file.name.split(".")[1];
      const extension =
        fileType === "jpg" || fileType === "jpeg" || fileType === "png";
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (extension) {
        this.$message.warning("上传模板不能是 jpg、jpeg、png格式!");
        this.$refs.fileUpload.clearFiles();
        return false;
      }
      if (!isLt2M) {
        this.$message.warning("上传模板大小不能超过 5MB!");
        this.$refs.fileUpload.clearFiles();
        return false;
      }
      this.formData.productPapers = "1";
      this.formData.productName = file.name;
      return false; // 返回false不会自动上传
    },
    /**
     * 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。
     */
    handleFileUploadBeforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    /**
     * 文件列表移除文件时的钩子
     */
    handleFileUploadRemove(file, fileList) {
      // 重置上传的标记值
      !fileList.length && (this.formData.productPapers = "");
    },
    /**
     * 文件上传成功时的钩子
     */
    handleFileUploadSuccess(response, file, fileList) {
      this.$message({
        message: "文件上传成功",
        type: "success",
        duration: 600
      });
    },
    /**
     * 文件上传失败时的钩子
     */
    handleFileUploadError(err, file, fileList) {
      this.$message({
        message: "文件上传失败，请重新上传",
        type: "error",
        duration: 600
      });
    },

    cancel() {
      this.show = true;
      this.resetForm("uploadForm");
      this.formData.productPapers = "";
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      if (this.tab == 1) {
        this.getLqueryProductLibraryListist();
      } else if (this.tab == 2) {
        this.getqueryCaseLibraryList();
      } else if (this.tab == 3) {
        this.getquerySolutionLibraryList();
      }
    },
    //每页多少条
    handleSizeChange(val) {
      this.queryParams.pageSize = val;
      if (this.tab == 1) {
        this.getLqueryProductLibraryListist();
      } else if (this.tab == 2) {
        this.getqueryCaseLibraryList();
      } else if (this.tab == 3) {
        this.getquerySolutionLibraryList();
      }
    },
    //分页
    handleCurrentChange(val) {
      this.queryParams.pageNum = val;
      if (this.tab == 1) {
        this.getLqueryProductLibraryListist();
      } else if (this.tab == 2) {
        this.getqueryCaseLibraryList();
      } else if (this.tab == 3) {
        this.getquerySolutionLibraryList();
      }
    },
    //切换tab标签
    clicktab(val) {
      this.queryParams.pageSize = 10;
      this.queryParams.pageNum = 1;
      this.pageNum = 1;
      this.tab = val;
      if (val == 1) {
        this.getLqueryProductLibraryListist();
      } else if (val == 2) {
        this.getqueryCaseLibraryList();
      } else if (val == 3) {
        this.getquerySolutionLibraryList();
      }
    },

    //
    translation(val) {
      this.formData.translation = val;
    },
    business(val) {
      this.formData.business = val;
    },
    labelCategory(val) {
      this.formData.labelCategory = val;
    },

    /** 知识库案例分享 列表 */
    getqueryCaseLibraryList() {
      this.loading = true;
      queryCaseLibraryList(this.queryParams)
        .then(response => {
          this.list = response.rows;
          this.total = response.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    //删除 知识库案例分享
    deleteCase(caseId) {
      this.$confirm("是否确认删除?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return deleteCaseStatistics(caseId);
        })
        .then(() => {
          this.getqueryCaseLibraryList();
          this.getProductCount();
          this.msgSuccess("删除成功");
        })
        .catch(function() {});
    },

    /** 知识库解决方案 列表 */
    getquerySolutionLibraryList() {
      this.loading = true;
      querySolutionLibraryList(this.queryParams)
        .then(response => {
          this.list = response.rows;
          this.total = response.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    //删除解决方案
    deleteSolution(solutionId) {
      this.$confirm("是否确认删除?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return deleteSolutionStatistics(solutionId);
        })
        .then(() => {
          this.getquerySolutionLibraryList();
          this.getProductCount();
          this.msgSuccess("删除成功");
        })
        .catch(function() {});
    }
  }
};
</script>
<style lang="stylus" scoped>
.dict-knowledge-base
  margin 0 auto
  width 100%
  max-width 1660px
  padding 6px 24px
  overflow-y auto
  .knowledge-enter-active
    transition all 0.3s cubic-bezier(1, 0.5, 0.8, 1)
  .knowledge-leave-active
    transition all 0.3s cubic-bezier(1, 0.8, 0.5, 1)
  .knowledge-enter, .knowledge-leave-to
    transform translateX(-10px)
    opacity 0
  .knowledge-document
    display flex
    .leftBox
      width 174px
      height 100%
      background-color #fff
      .title
        height 62px
        font-size 14px
        line-height 62px
        padding-left 22px
      .itemList
        height 600px
        overflow-y auto
        .item
          height 50px
          width 100%
          cursor pointer
          font-size 14px
          line-height 50px
          text-align center
        &>:hover
          background rgba(234, 234, 234, 1)
        .is-active
          background rgba(234, 234, 234, 1)
    .rightBox
      width 85%
      padding-left 25px
      .selectBox
        height 62px
        line-height 62px
        .el-input
          width 374px
          margin-right 14px
      .docBox
        padding 0px 24px 24px 24px
        background-color #fff
        box-shadow 1px 2px 3px 0px rgba(0, 0, 0, 0.05)
        border-radius 4px 4px 4px 4px
        .title
          height 55px
          line-height 55px
          border-bottom 1px solid #E9E9E9
          span
            font-size 16px
            margin-right auto
            padding-left 12px
            border-left 4px solid #5A8BFF
          .el-button
            float right
            margin-top (23 / 2)px
        .docItemList
          height 480px
          overflow-y auto
          .item
            height 169px
            display flex
            border-bottom 1px solid #E9E9E9
            .item-img
              width (86 - 24)px
              text-align center
              padding-top 26px
              img
                height 26px
                width 26px
            .item-body
              width 70%
              padding-top 28px
              .body-title
                display flex
                .name
                  display inline-block
                  font-size 16px
                  line-height 24px
                  padding-right 19px
              .body-explain
                width 100%
                height 60px
                font-size 12px
                margin-top 17px
                color rgba(153, 153, 153, 1)
                display -webkit-box
                -webkit-line-clamp 3
                text-overflow ellipsis
                -webkit-box-orient vertical
                overflow hidden
              .body-footer
                color #999999
                margin-top 10px
                font-size 12px
                span
                  padding-right 30px
                &>:first-child
                  padding-right 30px
                &>:last-child
                  padding-left 30px
                &>:nth-child(2)
                  padding 0px 30px
                  border-left 1px solid #E9E9E9
                  border-right 1px solid #E9E9E9
            .item-operation
              text-align right
              width 30%
              line-height 169px
              .el-button
                .el-icon-download
                  color #3078FF
                .el-icon-delete
                  color #FF0000
        .docFooter
          margin-top 10px
          text-align right
  .add-knowledge-document
    background-color #fff
    border-radius 4px
    padding 0px 24px 24px 24px
    box-shadow 1px 2px 3px 0px rgba(0, 0, 0, 0.05)
    .title
      height 55px
      line-height 55px
      margin-bottom 14px
      span
        padding-left 12px
        font-size 16px
        font-weight 400
        color rgba(0, 0, 0, 1)
        border-left 4px solid #5A8BFF
    .knowledgeBody
      max-width 1200px
      margin 0 auto
      .el-select
        margin 0 10px 0 0
      .radio-tag
        height 30px
        line-height 30px
        display inline-block
        width 120px
        font-size 14px
        font-size 14px
        cursor pointer
        margin-left 14px
        background rgba(233, 233, 233, 1)
        border 1px solid rgba(255, 255, 255, 1)
        border-radius 4px
        text-align center
        &:nth-child(1)
          margin-left 0px
      .is-active
        color #fff
        background-color #5A8BFF
      .item
        margin-top 14px
        padding-left 35%
        display flex
        .el-select
          width 160px
          &:last-child
            margin-left 10px
        .text
          font-size 14px
          font-weight 400
          line-height 32px
          color rgba(102, 102, 102, 1)
        .btn
          margin-top 14px
          display inline-block
          width 120px
          height 40px
          line-height 40px
          cursor pointer
          text-align center
          margin-left 40px
          font-size 14px
          border 1px solid rgba(233, 233, 233, 1)
          border-radius 2px
          &:last-child
            color #fff
            background-color #5A8BFF
        .tag
          height 30px
          line-height 30px
          display inline-block
          width 120px
          font-size 14px
          font-size 14px
          cursor pointer
          margin-left 14px
          background rgba(233, 233, 233, 1)
          border 1px solid rgba(255, 255, 255, 1)
          border-radius 4px
          &:nth-child(2)
            margin-left 0px !important
        .is-active
          color #fff
          background-color #5A8BFF
        .upload-demo
          text-align left
</style>
<style lang="stylus">
.dict-knowledge-base
  .docItemList
    .el-button
      background-color rgba(245, 245, 245, 1)
      border none
      .el-icon-download
        color #3078FF
      .el-icon-delete
        color #FF0000
  .add-knowledge-document
    .knowledgeBody
      .el-upload--picture-card
        border none
        .el-upload-dragger
          height 148px
          width 148px
</style>