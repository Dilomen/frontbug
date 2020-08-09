<template>
  <div class="abnormal-detail">
    <el-row>
      <el-col :span="16">
         <el-card>
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="基本信息" name="first">
              <error-info :data="data" />
            </el-tab-pane>
            <el-tab-pane label="场景重现" name="second">
              <div id="panel"></div>
            </el-tab-pane>
            <el-tab-pane label="用户行为" name="third">
              用户行为
            </el-tab-pane>
            <el-tab-pane label="修改日志" name="fourth">
              <record />
            </el-tab-pane>
          </el-tabs>
         </el-card>
      </el-col>
      <el-col :span="8">
        <div class="user-wrap">
          <el-card>
            <div slot="header" class="clearfix">
              <span>用户信息</span>
            </div>
            <div class="text item">
              <p><label>用户ID: </label>{{ data.id }}</p>
              <p><label>设备: </label>{{ data.userAgent.os }}</p>
              <p><label>浏览器: </label>{{ data.userAgent.browser }}</p>
              <p><label>版本: </label>{{ data.userAgent.version }}</p>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>

  </div>
</template>
<script>
import record from './record'
import errorInfo from './error-info'
import { getErrorDetail } from '@/api/error-watch'
export default {
  components: { record, errorInfo },
  props: {},
  data () {
    return {
      activeName: 'first',
      data: {
        userAgent: {}
      },
      id: this.$route.params.id
    }
  },
  computed: {},
  created () { },
  async mounted () {
    this.data = await getErrorDetail(this.id)
  },
  methods: {
    handleClick (tab, event) {
      if (this.activeName === 'second') {
        const panel = document.querySelector("#panel")
        new rrwebPlayer({
          target: panel,
          data: { events: this.data.eventsRecord },
          autoplay: false
        });
      }
    }
  }
}
</script>
<style scoped lang="scss">
.abnormal-detail {
  padding: 24px;
  .user-wrap {
    width: 80%;
    margin: 0 auto;
    label {
      width: 80px;
      display: inline-block;
    }
  }
}
</style>
