<template>
  <div class='content'>
    <!-- 详情页面 图片与信息 -->
    <div class='container'>
      <!-- 左侧图片 -->
      <!-- :goodsDtail='goodsDtail'父向子传值 -->
      <preview :fistDesImg='fistDesImg' :desImg='desImg'></preview>
      <!-- 右侧信息 -->
      <property :goodsDtail='goodsDtail'></property>
    </div>
    <div>评价反馈</div>
    <div class='clear'>
      <div class='satisfL'>
        <span>上身效果</span>
        <reviews></reviews>
        <span>面料舒服</span>
        <reviews></reviews>
      </div>
      <div class='satisfR'>
        <span>心水好物</span>
        <reviews></reviews>
        <span>值的购买</span>
        <reviews></reviews>
      </div>
    </div>

    <!-- 详情图片 -->
    <div class='simple'>
      <div class='simple-hd'>商品详情</div>
    </div>
    <div class='simple-bd'>
      <ul>
        <li v-for='(item, index) in desImg' :key='index'>
          <img :src='item' alt />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import bus from "../../../bus/bus"
import preview from './DetailConL.vue'
import property from './DetailConR.vue'
import reviews from './reviews'
export default {
  name: 'detailCon',
  components: {
    preview,
    property,
    reviews
  },
  data() {
    return {
      goodsDtail: [],
      desImg: [],
      fistDesImg: ''
    };
  },
  watch: {
    "$route.query.gid"() {
      // this.$route.query.gid
      this.getDetail()
    },

  },
  methods: {
    getDetail() {
      console.log('路由信息' + this.$route.query.gid);
      var gid = this.$route.query.gid;
      // 发送ajax 根据gid请求商品详情信息 返回该商品详情 
      var url = `/getDetail?gid=${gid}`;
      this.$http
        .get(url)
        .then(res => {
          this.goodsDtail = res.data[0];
          bus.$emit('goodsDtail', this.goodsDtail);
          this.desImg = this.goodsDtail.desimg.split(' ');
          this.fistDesImg = this.desImg[0];
        });
    }
  },
  mounted() {
    this.getDetail()
  },
}
</script>

<style scoped>
/* 引入公共css类 */
@import url("../../../assets/css/base.css");

.detail {
  font-size: 20px;
}
/* 中间内容部分 */
.content {
  width: 1200px;
  /* height: 1200px; */
  margin: 0 auto;
  background: #f4f4f4;
}

/* 放大与信息详情模块 */
.container {
  width: 1200px;
  margin: 0 auto;
  height: 700px;
}
.clear {
  overflow: auto;
}
.satisfL {
  /* background-color: red; */
  float: left;
  padding-left: 100px;
}
.satisfR {
  /* background-color: red; */
  float: right;
  padding-right: 100px;
}
.el-rate {
  height: 60px;
}
/* 底部图片显示 */
.simple {
  margin-top: 30px;
  /* background-color: orange; */
}
.simple-hd {
  font-size: 60px;
  font-family: "宋体";
  color: #52bfff;
}
.simple-bd {
  /* background-color: blue; */
  text-align: center;
}
.simple-bd img {
  margin-top: 30px;
}
</style>
