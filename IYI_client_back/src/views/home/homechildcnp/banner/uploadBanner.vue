<template>
  <div>

    <el-dialog title="上传轮播图" :visible.sync="dialogFormVisible" @close="cancelbanner" align="center">

      <el-form @submit.native.prevent>
        <el-form-item label="轮播图名称" :label-width="formLabelWidth">
          <el-input v-model="bannername" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="上传文件" :label-width="formLabelWidth" align="left">
          <input type="file" @change="imgchange">
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelbanner">取 消</el-button>
        <el-button type="primary" @click="uploadbanner">上 传</el-button>
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
        bannername: "",
        uploadimgfile: null
      };
    },

    created() {
      //监听uploadbanner事件，打开弹框
      bus.$on("uploadbanner", () => {
        this.dialogFormVisible = true
      })
    },
    methods: {
      imgchange(e) {
        this.uploadimgfile = e.target.files[0]
      },
      // 点击确定更新轮播图信息
      uploadbanner() {
        let formData = new FormData();
        //如果图片名称不为空
        if (this.bannername.trim()) {
          formData.append("name", this.bannername.trim())
          //如果上传文件不为空
          if (this.uploadimgfile) {
            formData.append("uploadFile", this.uploadimgfile, this.uploadimgfile.name)
            const config = {
              headers: {
                "Content-Type": "multipart/form-data;boundary=" + new Date().getTime()
              }
            };
            this.$http.post("/uploadBanner", formData, config)
              .then(res => {
                if (res.data == 1) {
                  this.$message("上传成功")
                  this.$parent.getAllBanner()
                  this.bannername = ""
                  this.uploadimgfile=null
                  this.dialogFormVisible = false
                }
              })
              .catch(err => console.log(err));
          } else {
            this.$message("请选择文件")
          }
        } else {
          this.$message("名称不能为空")
        }

      },
      
      cancelbanner() {
        // this.$parent.getAllBanner()
        this.dialogFormVisible = false
      }
    },

  };
</script>