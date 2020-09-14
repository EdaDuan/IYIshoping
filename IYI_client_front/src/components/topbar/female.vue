<template>
  <div class='boxwoman'>
    <ul>
      <li id='woman' v-for='(item, index) in femalelist' :key='index'>
        <img :src='item.cover' @click='detailwoman(item.id)' alt />
        <p id='pwoman'>{{item.name}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      femalelist: []
    }
  },
  created() {
    this.$http.get("/getAllClassify", {
      params: {
        classify: `%女装%`
      }

    }).then((res) => {
      if (res.data.length > 5) {
        this.femalelist = res.data.splice(0, 5);
      }
      else {
        this.femalelist = res.data
      }
    }).catch((err) => {
      console.log('请求失败');
    })
  },
  methods: {
    detailwoman(gid) {
      this.$router.push({ path: "/detail", query: { gid } });
    }
  }
}
</script>

<style scope>
.boxwoman {
  width: 1200px;
  margin: 0 auto;
}
#woman {
  height: 240px;
  float: left;
  padding: 0 10px;
  text-align: center;
}
#woman img {
  width: 200px;
  height: 200px;
}
#pwoman {
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>