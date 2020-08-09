<template>
  <div style="padding:24px">
    <el-card>
      <aside class="tip">请上传您的sourceMap文件，以便源码错误定位</aside>
      <el-upload
        class="upload-demo"
        drag
        accept=".js"
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
        :before-upload="beforeUpload">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传js文件，且不超过100MB</div>
      </el-upload>
    </el-card>
  </div>
</template>
<script>
export default {
  props: {},
  data () {
    return {
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    beforeUpload(file) {
      //是否小于100M
      const isLt100M = file.size / 1024 / 1024 < 100;
      return isLt2M;
    }
  }
}
</script>
<style scoped lang="scss">
@import "~@/styles/variables.scss";
.tip {
  padding: 5px 16px;
  display: block;
  background: $menuActiveText;
  color: #fff;
  border-radius: 4px;
}
</style>
