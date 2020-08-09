<template>
  <div>
    <div class="info">
      <p class="info-item">
        <label>错误信息</label>
        {{ data.msg }}
      </p>
      <p class="info-item">
        <label>文件路径</label>
        {{ data.source }}
      </p>
      <p class="info-item">
        <label>line</label>
        {{ data.line }}</p>
      <p class="info-item">
        <label>column</label>
        {{ data.column }}</p>
      <p class="info-item">
        <label>报错时间</label>
        {{ data.happenTime }}
      </p>
    </div>
    
    <div class="error-card">
      <pre>
        <div v-for="(code, index) in data.sourcesContent" :key="code + index"  :class="['line', index === 3 ? 'err-line': '']">
          <b class="line-num">{{ data.line + index - 3 }}</b>
          <code>
            {{ code }}
          </code>
        </div>
      </pre>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
    }
  },
  computed: {},
  created () { },
  mounted () { },
  methods: {}
}
</script>
<style scoped lang="scss">
@import "~@/styles/variables.scss";
.info {
  color: $subMenuBg;
  .info-item {
    display: inline-block;
    width: 50%;
    margin: 5px 0;
    label {
      width: 100px;
      display: inline-block;
      text-align: right;
      &:after {
        content: ':';
        padding-right: 10px;
      }
    }
  }
}
.error-card {
  border-radius: 4px;
  background: $menuText;
  .line {
    display: flex;
    align-items: center;
    padding: 0 16px;
    &-num {
      color: $menuBg;
    }
  }
  .err-line {
    background: $pink;
  }
}
</style>
