<!--  -->
<template>
  <div class="table" style="text-align: center;" >
    <el-table :data="userInfo" style="width: 100%" height="400">


      <el-table-column label="姓名" width="180">

        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>

      <el-table-column label="密码" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.password}}</span>
        </template>
      </el-table-column>

      <el-table-column label="手机号" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.phone}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
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
      //这里存放数据
      return {
        userInfo: []
      };
    },
    created() {
      this.getAllUser()
    },
    methods: {
      getAllUser() {
        this.$http.post("/getAllUser").then(r => {
          console.log(r.data)
          this.userInfo = r.data
        }).catch(err => console.log(err))
      },

      //删除操作
      handleDelete(index, row) {
        this.$confirm('此操作将不可逆, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(row.id)

          this.$http.post("/deleteUser", {
            userid: row.id
          }).then(r => {
            if (r.data == 1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getAllUser()
            }
          })
        }).catch((err) => {
          console.log(err)
        });
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