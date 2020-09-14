<template>
  <div>

    <el-dialog title="上传商品" :visible.sync="dialogFormVisible" @close="cancel" width="300">


      <el-form :model="newGoodsInfo" @submit.native.prevent :rules="rules" ref="currentForm">

        <el-form-item label="商品名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="newGoodsInfo.name" autocomplete="off" placeholder="让我们更好的检索到商品"></el-input>
        </el-form-item>

        <el-form-item label="商品价格" :label-width="formLabelWidth" prop="price">
          <el-input v-model="newGoodsInfo.price" autocomplete="off" placeholder="美丽的价格"></el-input>
        </el-form-item>

        <el-form-item label="商品描述" :label-width="formLabelWidth" prop="descp">
          <el-input v-model="newGoodsInfo.descp" autocomplete="off" placeholder="吸引顾客必不可少的词汇"></el-input>
        </el-form-item>

        <el-form-item label="商品分类" :label-width="formLabelWidth" prop="type">
          <el-input v-model="newGoodsInfo.type" autocomplete="off" placeholder="不同分类使用空格隔开"></el-input>
        </el-form-item>

        <el-form-item label="商品库存" :label-width="formLabelWidth" prop="rest">
          <el-input v-model="newGoodsInfo.rest" autocomplete="off" placeholder="确保您有充足的货源"></el-input>
        </el-form-item>

        <el-form-item label="商品主图" :label-width="formLabelWidth">
          <input type="file" @change="newCover">
        </el-form-item>

        <el-form-item label="商品详情图" :label-width="formLabelWidth">
          <input type="file" @change="newDesImg" multiple>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm('currentForm')">确 定</el-button>
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
        // 新增商品信息
        newGoodsInfo: {
          name: "",
          price: "",
          descp: "",
          type: "",
          rest: ""
        },
        //商品主图
        coverFile: null,
        // 商品详情图
        desImgFile: {},
        //验证规则
        rules: {
          name: [{
            required: true,
            message: '请输入商品名称',
            trigger: 'blur'
          }, ],
          price: [{
            required: true,
            message: '请输入商品价格',
            trigger: 'blur'
          }, ],
          descp: [{
            required: true,
            message: '请输入商品描述',
            trigger: 'blur'
          }, ],
          type: [{
            required: true,
            message: '请输入商品分类',
            trigger: 'blur'
          }, ],
          rest: [{
            required: true,
            message: '请输入商品库存',
            trigger: 'blur'
          }, ]
        }
      };
    },

    created() {
      bus.$on("uploadGoods", () => {
        this.dialogFormVisible = true;
      })
    },
    methods: {
      // 改变主图时
      newCover(e) {
        this.coverFile = e.target.files[0];
      },
      // 改变详情图时
      newDesImg(e) {
        this.desImgFile = e.target.files;
      },
      // 提交，上传新商品
      submitForm(currentForm) {
        this.$refs[currentForm].validate((valid) => {
          if (valid) {
            console.log(this.coverFile)
            console.log(this.desImgFile)
            //如果表单信息符合规定
            if (this.coverFile && this.desImgFile.length >= 1) {
              //如果有主图文件和详情图文件，才允许上传
              let formData = new FormData();
              formData.append("name", this.newGoodsInfo.name)
              formData.append("price", this.newGoodsInfo.price)
              formData.append("descp", this.newGoodsInfo.descp)
              formData.append("type", this.newGoodsInfo.type)
              formData.append("rest", this.newGoodsInfo.rest)
              formData.append("cover",this.coverFile,this.coverFile.name)
              this.desImgFile.forEach(item => formData.append('desimg', item,item.name));
  
              const config = {
                headers: {
                  "Content-Type": "multipart/form-data;boundary=" + new Date().getTime()
                }
              };
              this.$http.post("/uploadGoods", formData, config)
                .then(res => {
                  if (res.data == 1) {
                    this.$message("上传成功")
                    this.$parent.getGoodsDataByPage(this.$parent.currentPage)
                    this.dialogFormVisible = false
                  }
                })
                .catch(err => console.log(err));
            } else {
              this.$message({
                type: "error",
                message: "必须上传商品主图和商品详情图"
              })
            }
          } else {
            //如果不符合规定
            this.$message({
              type: "error",
              message: "请输入正确的表单信息"
            })
            return false;
          }
        });
      },
      //点击取消
      cancel() {
        console.log("cancle")
        this.$parent.getGoodsDataByPage(this.$parent.currentPage)
        this.dialogFormVisible = false
      },
    },

  };
</script>