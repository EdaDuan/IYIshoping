<template>
  <el-rate v-model='value' disabled show-score text-color='#ff9900' score-template='{value}'></el-rate>
</template>

<script>
export default {
  data() {
    return {
      value: 4.5
    }
  }
}
</script>

<style scope>
.el-rate__icon {
  font-size: 50px;
}
</style>