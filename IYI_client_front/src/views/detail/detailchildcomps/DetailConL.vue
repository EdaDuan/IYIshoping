<template>
  <div class='preview'>
    <!-- <div class='showBox'>
      <img class='imgsrc' :src='desImg[curIndex]' />
    </div>-->
    <larage :imgsrc='desImg[curIndex]'></larage>
    <ul>
      <li
        v-for='(item, index) in desImg'
        :key='index'
        @click='changImg(index)'
        @mouseenter='changImg(index)'
      >
        <img :src='item' alt />
      </li>
    </ul>
    <div class='promise'>
      <span class='iconfont icon-zhengpinbaozhang'>100%正品</span>
      <span class='iconfont icon-dazhe03'>天天有折扣</span>
    </div>
  </div>
</template>
<script>
import larage from './larage.vue'
export default {
  name: 'detail',
  data() {
    return {
      curIndex: 0,
    }
  },
  components: {
    larage
  },
  props: {
    'desImg': {
      type: Array, default: []
    },
  },
  methods: {
    // 点击和鼠标移入小图片 在大图片中显示
    changImg(index) {
      this.curIndex = index;
    },
    // 放大图片
    bigImg() {
      console.log(123);
    },
  }
}
</script>

<style>
.preview {
  width: 530px;
  vertical-align: top;
  margin: 10px 30px;
  /* background-color: red; */
}
.mask {
  position: absolute;
}
.showBox {
  width: 530px;
  height: 500px;
  overflow: hidden;
}
.imgsrc {
  width: 100%;
  height: 100%;
  /* border: 1px solid #606266; */
}
.preview ul {
  height: 100px;
}

.preview ul img {
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.preview ul li {
  width: 100px;
  height: 100px;
  margin: 0 4px;
  float: left;
}
.promise {
  width: 100%;
  height: 60px;
  margin-top: 10px;
  line-height: 60px;
  /* background-color: green; */
}
.promise span {
  margin: 0 40px;
  font-size: 30px;
  color: #ccc;
}
.property {
  width: 600px;
  /* height: 500px; */
  line-height: 50px;
  margin-top: 10px;
  /* background-color: orange; */
}
.preview {
  float: left;
}
</style>