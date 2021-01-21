<template>
  <div class="trace-distribution">
    <div class="header">
      <el-form ref="form" :model="form" label-width="100px">
        <el-row>
          <el-col :span="10">
            <el-form-item label="时间维度：">
              <el-col :span="11">
                <el-date-picker
                  type="datetime"
                  placeholder="选择日期时间"
                  v-model="form.date1"
                  style="width: 100%"
                ></el-date-picker>
              </el-col>
              <el-col class="line" :span="1">—</el-col>
              <el-col :span="11">
                <el-date-picker
                  placeholder="选择日期时间"
                  type="datetime"
                  v-model="form.date2"
                  style="width: 100%"
                ></el-date-picker>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="用户选择">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary">查询</el-button>
              <el-button type="success">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div>
      <chart-map
        :longitude="mapData.longitude"
        :latitude="mapData.latitude"
      ></chart-map>
    </div>
  </div>
</template>

<script>
import ChartMap from "@/components/baiduMap/chartMap.vue";
export default {
  name: "",
  components: { ChartMap },
  data() {
    return {
      mapData: {
        longitude: 116.404,
        latitude: 39.936,
      },
      form: {
        date1: "",
        date2: "",
        name: "",
      },
    };
  },
  mounted() {},
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.trace-distribution {
  position: relative;
  .header {
    width: 100%;
    position: absolute;
    top: 10;
    left: 10;
    z-index: 9999;
    border: 1px solid #d8dce5;
    padding-top: 20px;
    background: #ffffff;
    .line {
      margin-left: 8px;
    }
  }
}
</style>