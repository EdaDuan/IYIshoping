<!--  -->
<template>
  <div>
    <div id='content'>
      <div id='small-box' @mouseenter='func1' @mouseleave='func2' @mousemove='func3'>
        <img :src='imgsrc' />
        <div id='enlargy'></div>
      </div>
      <div id='big-box'>
        <img :src='imgsrc' />
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: '',
  components: {},
  data() {
    //这里存放数据
    return {
      smallBox: "",
      bigBox: "",
      largy: "",
      img: ""
    };
  },
  props: ["imgsrc"],
  mounted() {
    this.smallBox = document.getElementById('small-box'); //小div
    this.bigBox = document.getElementById('big-box'); //大div
    this.largy = document.getElementById('enlargy'); //放大镜
    this.img = document.querySelector('#big-box img'); //大div里面的图片
  },
  methods: {
    func1() {
      this.bigBox.style.display = 'block';
      this.largy.style.display = 'block';
    },
    func2() {
      this.bigBox.style.display = 'none';
      this.largy.style.display = 'none';
    },
    func3(e) {
      let rect = this.smallBox.getBoundingClientRect();
      //1）放大镜的top值=鼠标在页面里面的Y值(e.pageY)-smallBox视窗的Y上距离(rect对象获得)+滚动条滚动的距离（window.scorllY）-自身高度的一半

      let y = `${e.pageY - rect.top - window.scrollY - this.largy.offsetHeight / 2}`;
      // console.log(y)
      this.largy.style.top = `${y}px`;
      //2)判断Y轴上是否超出边界，超出旧固定top和left的值
      if (y > 0 && y < 400) {
        this.largy.style.top = `${y}px`;
        // 同时改变大图片的定位，注意有相应的倍数
        this.img.style.top = `${-y * 3.75}px`;
      } else if (y < 0) {
        this.largy.style.top = 0;
        this.img.style.top = 0;
      } else if (y > 400) {
        this.largy.style.top = `400px`;
        this.img.style.top = `-${this.img.offsetHeight - this.bigBox.offsetHeight}px`;
      }

      //3）left值=鼠标在页面中的X值(e.pageX)-smallBox左边距离视窗左边的距离-自身高度的一半
      let x = `${e.pageX - rect.left - this.largy.offsetWidth / 2}`;
      this.largy.style.left = `${x}px`;
      // console.log(x)
      //4)判断Y轴上是否超出边界，超出旧固定top和left的值
      if (x > 0 && x < 400) {
        this.largy.style.left = `${x}px`;
        //同时改变大图片的定位
        this.img.style.left = `${-x * 3.75}px`;
      } else if (x < 0) {
        this.largy.style.left = 0;
        this.img.style.left = 0
      } else if (x > 400) {
        this.largy.style.left = `400px`;
        this.img.style.left = `-${this.img.offsetWidth - this.bigBox.offsetWidth}px`;
      }

    }
  },
}
</script>


<style scoped>
/* @import url(); 引入公共css类 */
#content {
  width: 1100px;
  height: 500px;
  box-sizing: border-box;
  display: flex;
}

#small-box {
  width: 500px;
  height: 500px;
  position: relative;
}

#small-box img {
  width: 100%;
  height: 100%;
}

#enlargy {
  width: 100px;
  height: 100px;
  background-color: rgba(255, 255, 0, 0.2);
  position: absolute;
  top: 0;
  left: 0;
  display: none;
}

#big-box {
  width: 500px;
  height: 500px;
  overflow: scroll;
  display: none;
  position: relative;
  z-index: 999;
}

#big-box::-webkit-scrollbar {
  width: 0;
  height: 0;
}

#big-box img {
  width: 2000px;
  height: 2000px;
  position: absolute;
  top: 0;
  left: 0;
}
</style>