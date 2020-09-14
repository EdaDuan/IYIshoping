<template>
  <div>

    <el-dialog title="商品信息修改" :visible.sync="dialogFormVisible" @close="cancelbanner" width="300" align="center">


      <el-form :model="currentGoodsInfo" @submit.native.prevent :rules="rules" ref="currentForm">
        <el-form-item label="商品名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="currentGoodsInfo.name" autocomplete="off" placeholder="让我们更好的检索到商品"></el-input>
        </el-form-item>

        <el-form-item label="商品价格" :label-width="formLabelWidth" prop="price">
          <el-input v-model="currentGoodsInfo.price" autocomplete="off" placeholder="美丽的价格"></el-input>
        </el-form-item>

        <el-form-item label="商品描述" :label-width="formLabelWidth" prop="descp">
          <el-input v-model="currentGoodsInfo.descp" autocomplete="off" placeholder="吸引顾客必不可少的词汇"></el-input>
        </el-form-item>

        <el-form-item label="商品分类" :label-width="formLabelWidth" prop="type">
          <el-input v-model="currentGoodsInfo.type" autocomplete="off" placeholder="不同分类使用空格隔开"></el-input>
        </el-form-item>

        <el-form-item label="商品库存" :label-width="formLabelWidth" prop="rest">
          <el-input v-model="currentGoodsInfo.rest" autocomplete="off" placeholder="确保您有充足的货源"></el-input>
        </el-form-item>

        <el-form-item label="商品主图" :label-width="formLabelWidth">
          <el-image style="width: 400px; height: 200px" :src="currentGoodsInfo.cover" fit="cover"></el-image>
          <p><span style="margin-right: 20px;">上传文件替换主图</span><input type="file" @change="updataCover"></p>
        </el-form-item>

        <el-form-item label="商品详情图" :label-width="formLabelWidth">
          <el-image v-for="item in currentDesImgs" style="width: 200px; height: 100px" :src="item" fit="cover" :key="Math.random()">
          </el-image>
          <p><span style="margin-right: 20px;">上传详情图</span><input type="file" @change="updataDesImg" multiple></p>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelbanner">取 消</el-button>
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
        // 当前商品全部信息
        currentGoodsInfo: {},
        //获取数据的时候把详情图分隔成数组形式放进currentDescImgs
        currentDesImgs: [],
        //更改之后的商品主图
        updataCoverFile: null,
        updataDesImgFile: {},
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
      // 点击查看的时候接收当前项的信息并渲染出来
      bus.$on("updatagoods", (value) => {
        this.currentGoodsInfo = value;
        if (value.desimg)
          this.currentDesImgs = value.desimg.split(" ");
        this.dialogFormVisible = true
      })
    },
    methods: {
      // 改变主图时
      updataCover(e) {
        this.updataCoverFile = e.target.files[0];
      },
      // 改变详情图时
      updataDesImg(e) {
        this.updataDesImgFile = e.target.files;

      },
      //防止修改之后再取消，应该再次更新banner
      cancelbanner() {
        this.$parent.getGoodsDataByPage(this.$parent.currentPage)
        console.log(this.$parent)
        this.dialogFormVisible = false
      },
      submitForm(currentForm) {
        this.$refs[currentForm].validate((valid) => {
          if (valid) {
            //如果表单信息符合规定
            let formData = new FormData();
            formData.append("id",this.currentGoodsInfo.id)
            formData.append("name",this.currentGoodsInfo.name)
            formData.append("price",this.currentGoodsInfo.price)
            formData.append("descp",this.currentGoodsInfo.descp)
            formData.append("type",this.currentGoodsInfo.type)
            formData.append("rest",this.currentGoodsInfo.rest)
            // 如果用户有上传主图，则取最新的主图，如果没有则不加
            console.log(this.updataCoverFile)
            if(this.updataCoverFile){
              formData.append("cover",this.updataCoverFile,this.updataCoverFile.name)
            }
            //如果用户有上传详情图，则取最新的详情图，如果没有则不加
            if(this.updataDesImgFile.length>=1){
              this.updataDesImgFile.forEach(item => formData.append('desimg', item,item.name));
            }
           
            const config = {
              headers: {
                "Content-Type": "multipart/form-data;boundary=" + new Date().getTime()
              }
            };
            this.$http.post("/updataGoods", formData, config)
              .then(res => {
                console.log(res)
                if (res.data == 1) {
                  this.$message("修改成功")
                  this.$parent.getGoodsDataByPage(this.$parent.currentPage)
                  this.dialogFormVisible = false
                }
              })
              .catch(err => console.log(err));
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
    },

  };
</script>