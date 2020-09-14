<template>
  <div class="goods-box">
    <el-table class="table" :data="goodsData" style="width:500"  height="400" stripe>
      <el-table-column prop="id" label="商品ID" sortable width="100" align="center"></el-table-column>
      <el-table-column prop="name" label="商品名" width="250"></el-table-column>
      <el-table-column prop="price" label="价格" sortable width="100" align="center"></el-table-column>
      <el-table-column prop="descp" label="描述" width="200" align="center"></el-table-column>
      <el-table-column prop="type" label="分类" width="150" align="center"></el-table-column>
      <el-table-column prop="rest" label="库存" sortable width="100" align="center"></el-table-column>
      <el-table-column prop="sales" label="销量" sortable width="100" align="center"></el-table-column>


      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="display: flex; justify-content: space-between;">
      <!-- 分页 -->
      <el-pagination class="pagination" background layout="prev, pager, next" :total="totalCount"
        @current-change="pagechange" :page-size=10 :hide-on-single-page=true>
      </el-pagination>
      <!-- 打开上传商品的弹窗 -->
      <el-button style="width:200px; " @click="handleUpload">上传商品</el-button>
      
    </div>
    <!-- 上传商品弹窗 -->
    <uploadgoods></uploadgoods>
    <!-- 编辑商品信息的弹框 -->
    <goodsform></goodsform>
  </div>
</template>

<script>
  import bus from "../../../../bus/bus.js";
  import goodsform from "./goodsForm.vue";
  import uploadgoods from "./uploadGoods.vue";
  export default {
    components: {
      goodsform,
      uploadgoods
    },
    data() {
      return {
        // 数据总条数，根据数据总条数来决定分页器整多少个
        totalCount: 0,
        //每页的数据,每次只查询10条数据
        goodsData: [],
        //保存当前的pagenum，当每次删除数据的时候，需要重新请求最新数据
        currentPage: 1
      }
    },
    created() {
      this.getGoodsDataByPage()
    },
    methods: {
      // 根据页码查询相关数据，一次十条
      getGoodsDataByPage(page = 1) {
        this.$http.get("/getGoodsDataByPage", {
          params: {
            page: page
          }
        }).then(r => {
          //console.log(r.data) //{total: 37, goodsData: Array(10)}
          this.totalCount = r.data.total;
          this.goodsData = r.data.goodsData;
        }).catch(err => console.log(err))
      },


      // 编辑商品信息
      handleEdit(index, row) {
        bus.$emit("updatagoods", row)
      },
      //删除商品信息
      handleDelete(index, row) {
        //row是当前项的所有数据
        this.$confirm('此操作将不可逆, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(row.id)
          //点击确定的时候
          this.$http.get("/deleteGoods", {
            params: {
              goodsid: row.id
            }
          }).then(r => {
            if (r.data == 1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              //更新当前页的数据
              this.getGoodsDataByPage(this.currentPage)
            }
          })
        }).catch((cancle) => {
          // 点击取消的时候
          console.log(cancle)
        });
      },
      //页码改变时发生的事件
      pagechange(pageNum) {
        this.currentPage = pageNum;
        this.getGoodsDataByPage(pageNum)
      },
      handleUpload() {
        bus.$emit("uploadGoods")
      }
    }
  }
</script>

<style scoped>
  /* @import url(); 引入公共css类 */
  .table {
    margin-top: 50px;
    margin-bottom: 20px;
  }

  .goods-box {
    overflow: hidden;
    padding-left: 50px;
  }
</style>