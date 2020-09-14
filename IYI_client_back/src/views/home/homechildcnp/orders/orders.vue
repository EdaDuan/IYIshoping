<!--  -->
<template>
  <div class="order-box">
    <el-table class="table" :data="orderData" stripe height="400" >
      <el-table-column prop="id" label="订单号" sortable width="100" align="center"></el-table-column>
      <el-table-column prop="username" label="用户名" width="80" align="center"></el-table-column>
      <el-table-column prop="name" label="商品名" width="200"></el-table-column>
      <el-table-column prop="count" label="购买数量" sortable width="120" align="center"></el-table-column>
      <el-table-column prop="price" label="商品单价" sortable width="120" align="center"></el-table-column>
      <el-table-column prop="total" label="总计" sortable width="80" align="center"></el-table-column>
      <el-table-column prop="time" label="下单时间" sortable width="200" align="center"></el-table-column>

      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


  </div>
</template>


<script>
  export default {
    name: 'user',
    components: {},
    data() {
      return {
        orderData:[]
      };
    },
    created() {
      this.getOrderData()
    },
    methods: {
      getOrderData() {
        this.$http.post("/getOrderData").then(r => {
          this.orderData = r.data
        }).catch(err => console.log(err))
      },

      //删除操作
      handleDelete(index, row) {
        this.$confirm('此操作将不可逆, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post("/deleteOrder", {
            orderid: row.id
          }).then(r => {
            if (r.data == 1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getOrderData()
            }
          })
        }).catch((cancle) => {
          console.log(cancle)
        });
      }
    },
  }
</script>


<style scoped>
  /* @import url(); 引入公共css类 */
  .table {
    margin-top: 50px;
    margin-bottom: 20px;
  }

  .order-box {
    overflow: hidden;
    padding-left: 50px;
  }
</style>