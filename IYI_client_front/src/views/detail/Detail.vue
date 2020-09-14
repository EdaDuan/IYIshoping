<!--  -->
<template>
  <div class='detail w'>
    <!-- 详情页面导航部分 -->
    <detailTop></detailTop>

    <!-- 详情页面中间部分 -->
    <detailCon></detailCon>

    <!-- 底部 -->
    <bottom></bottom>
  </div>
</template>
<script>
// _detailtop前面需加下划线
import detailTop from './detailchildcomps/DetailTop.vue'
import detailCon from './detailchildcomps/DetailCon.vue'
import bottom from '../../components/bottom/bottom.vue'
export default {
  name: 'detail',
  components: {
    detailTop,
    detailCon,
    bottom
  },
  data() {
    return {}
  },

  mounted() {
    // location.href = "http://localhost:8080/#/detail?gid=34"
    window.scrollTo(0, 0)
  }
}
</script>

<style scoped>
</style>