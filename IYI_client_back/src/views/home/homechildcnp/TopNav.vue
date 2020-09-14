<!--  -->
<template>
  <div class="topnav">
    <p>欢迎你:<span>{{adminInfo.username}}</span> </p>
    <img :src="adminInfo.headimg">
    <button @click="cancel">注销</button>
  </div>
</template>


<script>
  export default {
    name: '',
    components: {},
    data() {
      //这里存放数据
      return {

      };
    },
    methods: {
      cancel() {
        localStorage.removeItem("admin")
        let vm = this;
        this.$message({
          showClose: true,
          message: '注销成功',
          type: 'success',
          center: true,
          duration: 1000,
          offset: 160,
          onClose() {
            vm.$router.go(0)
          }
        });

      }
    },
    computed: {
      adminInfo() {
        return JSON.parse(localStorage.getItem("admin"))[0]
      }
    },
  }
</script>


<style scoped>
  /* @import url(); 引入公共css类 */


  .topnav {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 60px;
    background-color: rgba(210, 214, 214, 0.407);
  }

  .topnav img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-left: 15px;
    margin-right: 20px;
  }

  .topnav button {
    outline: none;
    border: none;
    background-color: transparent;
    cursor: pointer;
    width: 40px;
    height: 30px;
    margin-right: 30px;
  }
</style>