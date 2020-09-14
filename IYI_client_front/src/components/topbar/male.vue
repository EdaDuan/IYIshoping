<template>
  <div class='boxman'>
    <ul>
      <li id='man' v-for='(item, index) in malelist' :key='index'>
        <img :src='item.cover' alt @click='detailman(item.id)' />
        <p id='pman'>{{item.name}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      malelist: [],
      routerAlive: true
    }
  },
  created() {
    this.$http.get("/getAllClassify", {
      params: {
        classify: `%男装%`
      }
    }).then((res) => {
      if (res.data.length > 5) {
        this.malelist = res.data.splice(0, 5);
      }
      else {
        this.femalelist = res.data
      }
    }).catch((err) => {
      console.log('请求失败');
    })
  },
  methods: {
    detailman(gid) {
      this.$router.push({ path: "/detail", query: { gid } });
    }
  }
}
</script>

<style scoped>
.boxman {
  width: 1200px;
  margin: 0 auto;
}
#man {
  height: 240px;
  float: left;
  padding: 0 10px;
  text-align: center;
}
#man img {
  width: 200px;
  height: 200px;
}
#pman {
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>