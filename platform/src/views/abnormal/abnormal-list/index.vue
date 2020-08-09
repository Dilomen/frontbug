<template>
  <div class="abnormal-list">
    <el-card>
      <el-table :data="list" border fit highlight-current-row style="width: 100%">
        <el-table-column width="180px" align="center" label="用户">
          <!-- <template slot-scope="scope"> -->
          <span>XXX</span>
          <!-- </template> -->
        </el-table-column>
        <el-table-column width="180px" align="center" label="错误类型">
          <template slot-scope="scope">
            <span>{{ getErrorType(scope.row.msg) }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="描述">
          <template slot-scope="scope">
            <span>{{ scope.row.msg }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="路由">
          <template slot-scope="scope">
            <span>{{ scope.row.source }}</span>
          </template>
        </el-table-column>

        <!-- <el-table-column width="120px" label="严重程度">
          <template slot-scope="scope">
            <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star" style="color:#E65D6E" />
          </template>
        </el-table-column> -->

        <el-table-column class-name="status-col" label="状态" width="110">
          <!-- <template slot-scope="{row}"> -->
          <el-tag type="success">
            已修改
          </el-tag>
          <!-- </template> -->
        </el-table-column>
        <el-table-column class-name="status-col" label="用户设备" width="110">
          <svg-icon icon-class="chrome" />
          <el-divider direction="vertical" />
          <svg-icon icon-class="linux" />
        </el-table-column>
        <el-table-column class-name="status-col" label="发生时间">
          <template slot-scope="scope">
            <span>{{ scope.row.happenTime }}</span>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="Status" width="110">
          <template slot-scope="{row}">
            <el-button size="small" type="primary" @click="handleDetail(row.id)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getErrorList } from '@/api/error-watch'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  props: {
    type: {
      type: String,
      default: 'CN'
    }
  },
  data() {
    return {
      list: null,
      loading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      getErrorList().then(response => {
        this.list = response
        this.loading = false
      })
    },
    handleDetail(id) {
      this.$router.push(`/abnormal-detail/${id}`)
    },
    getErrorType(msg) {
      const errorMap = {
        TypeError: '类型错误',
        SyntaxError: '语法错误',
        ReferenceError: '引用错误',
        URIError: 'URI处理错误',
        EvalError: 'eval执行错误',
        InternalError: 'JS引擎内部错误',
        Error: '错误'
      }
      const error = msg.split(":")[0]
      if (error) return errorMap[error]
      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
.abnormal-list {
  padding: 24px;
  .pagination {
    margin-top: 24px;
    text-align: right;
  }
}
</style>
