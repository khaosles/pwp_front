<template>
  <div>
    <div class="header-div">上传文件 <span class="close-span" @click="close">×</span></div>
    <div class="content-div">
      <el-upload
        class="uploadFile"
        name="file"
        ref="uploadFile"
        :drag="true"
        :action="actionUrl"
        :multiple="true"
        :on-success="judgeRes"
        :data="{ id: categoryId }"
        :auto-upload="false"
        :show-file-list="true"
      >
        <el-icon class="el-icon--upload">
          <upload-filled />
        </el-icon>
        <div class="el-upload__text">
          Drop file here or <em>click to upload</em>
        </div>
        <!--        <template #tip>-->
        <!--            <div class="el-upload__tip">-->
        <!--                jpg/png files with a size less than 500kb-->
        <!--            </div>-->
        <!--        </template>-->
      </el-upload>

      <el-button type="primary" @click="uploadFile">上传</el-button>
      <el-button type="primary" @click="clearFile">清除</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "uploadView",
  // props: {
  //     categoryId: String
  // },
  props: {
    categoryId: {
      type: String,
      default: "84422d4e219a44908b51fdf57f1ca8dc",
    },
  },
  data() {
    return {
      // 请求的url
      actionUrl: "",
      // 类别id
      // categoryId: "84422d4e219a44908b51fdf57f1ca8dc",
      // headers: {enctype: "multipart/form-data"}
    };
  },
  methods: {
    // 获得上传地址
    getActionUrl() {
      let store = this.$store.state;
      this.actionUrl = store.url + store.api.uploadLiterature.addr;
    },
    // 上传文件
    uploadFile() {
      this.$refs.uploadFile.submit();
    },
    // 清除选择
    clearFile() {
      this.$refs.uploadFile.clearFiles();
    },
    // 判断是否上传成功
    judgeRes(response, uploadFile, uploadFiles) {
      console.log(response, uploadFile, uploadFiles);
      if (response.success) {
        // alert("上传成功");
      } else {
        alert(response.msg);
      }
    },
    // 弹框 关闭
    close(){
    this.$parent.uploadVis=false
    }
  },

  mounted() {
    // 获得上传文件的接口
    this.getActionUrl();
  },
};
</script>

<style scoped>
.header-div {
  display: block;
  line-height: 60px;
  height: 60px;
  background: #2293f6;
  color: #fff;
  padding: 0 10px;
  font-size: 18px;
  font-weight: bold;
}
.header-div .close-span {
  display: inline-block;
  float: right;
  cursor: pointer;
}
.uploadFile {
  width: 100%;
}
.content-div {
  padding: 10px;
}
</style>
