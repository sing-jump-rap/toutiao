<template>
  <el-card v-loading="loading">
      <!-- 面包屑组件 -->
      <bread-crumb slot="header">
        <template slot="title">评论列表</template>
      </bread-crumb>
      <el-table :data="list">
          <el-table-column width="600px" label="标题" prop="title"></el-table-column>
          <el-table-column :formatter="formatter" align="center" label="评论状态" prop="comment_status"></el-table-column>
          <el-table-column align="center" label="总评数量" prop="total_comment_count"></el-table-column>
          <el-table-column align="center" label="粉丝评论数" prop="fans_comment_count"></el-table-column>
          <el-table-column align="center" label="操作" prop="">
              <!-- 作用域插槽 -->
              <template slot-scope="obj">
              <el-button  type="text" size="small">修改</el-button>
              <el-button @click="openOrclose(obj.row)" type="text" size="small">{{
                  obj.row.comment_status?'关闭评论':'打开评论'
                  }}</el-button>

              </template>
          </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row type="flex" justify="center" style='margin:20px 0'>
      <!-- page-size 是每页多少条 -->
      <el-pagination  @current-change="changePage" :current-page="page.currentPage" :page-size="page.pageSize" :total="page.total" background layout="prev, pager, next" ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      // 分页信息
      page: {
        total: 0, // 总条数
        currentPage: 1, // 默认第一页
        pageSize: 10 // 每页多少条
      },
      loading: false
    }
  },

  methods: {
    changePage (newPage) {
      this.page.currentPage = newPage // 更新最新页码给 currernpage
      this.getComment()
    },
    // 调接口获取评论列表
    getComment () {
      this.loading = true
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment', page: this.page.currentPage, per_page: this.page.pageSize } // 路径参数也就是query参数
      }).then(result => {
        // 返回的数组给list
        this.list = result.data.results
        // 把总条数给 分页组件的总条数
        this.page.total = result.data.total_count
        // 关遮罩
        this.loading = false
      })
    },
    //   formatter是elementui用来格式化数据的属性需要的方法
    formatter (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },
    // 打开或关闭当前行数据
    openOrclose (row) {
      var mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您确定要${mess}评论?`).then(() => {
        this.$axios({
          url: 'comments/status',
          method: 'put',
          // 路劲参数
          params: { article_id: row.id.toString() },
          //   body参数
          data: { allow_comment: !row.comment_status }
        }).then(() => {
          // 成功重新获取数据
          this.getComment()
        })
      })
    }

  },

  // 钩子函数
  created () {
    this.getComment()
  }
}
</script>

<style>

</style>
