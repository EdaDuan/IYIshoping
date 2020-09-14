<template>
  <div>
    
    <el-dialog title="修改轮播图信息" :visible.sync="dialogFormVisible" @close="cancelbanner" align="center">

      <el-form :model="currentItemInfo" @submit.native.prevent>
        <el-form-item label="轮播图名称" :label-width="formLabelWidth">
          <el-input v-model="currentItemInfo.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="轮播图预览" :label-width="formLabelWidth" align="left">
          <el-image style="width: 400px; height: 200px" :src="currentItemInfo.imgsrc" fit="cover"></el-image>
        </el-form-item>

        <el-form-item label="上传文件替换" :label-width="formLabelWidth" align="left">
          <input type="file" @change="imgchange">
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelbanner">取 消</el-button>
        <el-button type="primary" @click="updatabanner">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import bus from "../../../../bus/bus.js"
  export default {
    data() {
      return {
        dialogFormVisible: false,
        formLabelWidth: '120px',
        currentItemInfo: {},
        updataimgfile: null,
      };
    },

    created() {
      // 点击查看的时候接收当前项的信息并渲染出来
      bus.$on("updatabanner", (value) => {
        this.currentItemInfo = value;
        this.dialogFormVisible = true
      })
    },
    methods: {
      imgchange(e) {
        this.updataimgfile = e.target.files[0]
      },
      // 点击确定更新轮播图信息
      updatabanner() {
        let formData = new FormData();
        //如果图片名称不为空
        if (this.currentItemInfo.name.trim()) {
          formData.append("name", this.currentItemInfo.name)
          formData.append("bannerId", this.currentItemInfo.id)
          //如果上传文件不为空
          if (this.updataimgfile) {
            formData.append("uploadFile", this.updataimgfile, this.updataimgfile.name)
          }
          const config = {
            headers: {
              "Content-Type": "multipart/form-data;boundary=" + new Date().getTime()
            }
          };
          this.$http.post("/updataBanner", formData, config)
            .then(res => {
              if (res.data == 1) {
                this.$message("修改成功")
                this.$parent.getAllBanner()
                this.dialogFormVisible = false
              }

            })
            .catch(err => console.log(err));

        } else {
          this.$message("名称不能为空")
        }

      },
      //防止修改之后再取消，应该再次更新banner
      cancelbanner() {
        this.$parent.getAllBanner()
        this.dialogFormVisible = false
      }
    },

  };
</script>