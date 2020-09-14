<!--  -->
<template>
  <div class="table" style="text-align: right;" >
    <el-table :data="bannerInfo" style="width: 100%" height="400">

      <el-table-column label="名称" width="250">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="图片缩略图" width="250">
        <template slot-scope="scope">
          <!-- <span>{{scope.row.imgsrc}}</span> -->
          <el-image style="width: 100px; height: 50px" :src="scope.row.imgsrc" fit="cover"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleUpdate(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 修改轮播图信息的弹出框 -->
    <bannerform></bannerform>

    <!-- 打开上传轮播图的弹窗 -->
    <el-button style="width:200px; " @click="handleUpload">上传轮播图</el-button>
    <!-- 上传轮播图的弹窗 -->
    <uploadbanner></uploadbanner>
  </div>
</template>


<script>
  import bus from "../../../../bus/bus.js"
  import bannerform from "./BannerForm.vue";
  import uploadbanner from "./uploadBanner.vue";

  export default {
    name: 'banner',
    components: {
      bannerform,
      uploadbanner
    },
    data() {
      //这里存放数据
      return {
        bannerInfo: [],
      };
    },
    created() {
      this.getAllBanner()
    },
    methods: {
      // 获得所有轮播图
      getAllBanner() {
        this.$http.post("/getAllBanner").then(r => {
          // console.log(r.data)
          this.bannerInfo = r.data
        }).catch(err => console.log(err))
      },

      //删除轮播图操作
      handleDelete(index, row) {
        this.$confirm('此操作将不可逆, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post("/deleteBanner", {
            bannerid: row.id
          }).then(r => {
            if (r.data == 1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              //重新获取数据
              this.getAllBanner()
            }
          })
        }).catch((err) => {
          console.log(err)
        });
      },
      //修改轮播图操作
      handleUpdate(index, row) {
        bus.$emit("updatabanner", row)
      },
      handleUpload() {
        bus.$emit("uploadbanner")
      }
    },
  }
</script>


<style scoped>
  /* @import url(); 引入公共css类 */
  .table {
    margin-top: 50px;
    margin-left: 50px;
  }
</style>