<template>
  <div class='show' v-show='isshow' @mouseout='hidden' @mousemove='show' @mouseenter='show'>
    <male v-if='man'></male>
    <female v-if='woman'></female>
  </div>
</template>
<script>
import bus from "../../bus/bus.js";
import male from '../topbar/male.vue';
import female from '../topbar/female.vue'
export default {
  data() {
    return {
      isshow: false,
      man: false,
      woman: false,
      text: ''
    };
  },
  components: {
    male,
    female
  },
  // 在创建的时候绑定bus
  created() {
    // 对男装的操作
    bus.$on("showMale", (e) => {
      this.text = e.innerHTML;
      this.isshow = true;
      this.man = true;
      this.woman = false;
    })
    // 对女装的操作
    bus.$on("showFemale", (e) => {
      this.text = e.innerHTML;
      this.isshow = true;
      this.woman = true;
      this.man = false;
    })
  },
  methods: {
    show() {
      if (this.text == '男装') {
        this.woman == false
        this.isshow = true;
        this.man = true;
      }
      else if (this.text == '女装') {
        this.man == false
        this.isshow = true;
        this.woman = true;
      }
    },
    hidden(e) {
      if (e.target.tagName.toLocaleLowerCase() == "div") {
        this.isshow = false;
        this.man = false;
        this.woman = false;
      }

    }
  }
};
</script>
<style scoped="">
/* 设置显示盒子最外层的样式 绝对定位 */
.show {
  position: absolute;
  margin: 0 auto;
  top: 60px;
  z-index: 10;
  width: 100%;
  height: 250px;
  background-color: white;
}
</style>