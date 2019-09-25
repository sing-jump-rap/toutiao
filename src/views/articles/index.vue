<template>
  <el-card>
        <!--面包屑 -->
        <bread-crumb slot='header'>
           <template slot='title'>
               内容列表
           </template>
        </bread-crumb>
        <!-- {{formData}} -->
        <!-- 表单 -->
        <el-form style="margin-left:50px">
            <!-- 文章状态 -->
            <el-form-item label="文章状态:">
              <!-- v-model来源于el-radio中的label属性 -->
                 <el-radio-group @change="changeCondition" v-model="formData.status">
                   <el-radio :label="5">全部</el-radio>
                   <el-radio :label="0">草稿</el-radio>
                   <el-radio :label="1">待审核</el-radio>
                   <el-radio :label="2">审核通过</el-radio>
                   <el-radio :label="3">审核失败</el-radio>

            </el-radio-group>
            </el-form-item>
            <el-form-item label="频道列表:">
                <!-- 频道列表 -->
                <el-select @change="changeCondition" v-model="formData.channel_id">
                  <el-option v-for="item in channels" :key="item.id" :value="item.id" :label="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="时间选择:">
                   <!-- value-format指定绑定的时间格式 -->
                 <el-date-picker
                 @change="changeCondition"
                 v-model="formData.date"
                   type="daterange"
                   value-format="yyyy-MM-dd"
                   start-placeholder="开始日期"
                   end-placeholder="结束日期">
          </el-date-picker>
            </el-form-item>
        </el-form>
          <!-- 主体内容 -->
     <div class='total'>共找到{{page.total}}条符合条件的内容</div>
     <div class='article-item' v-for="(item,index) in list" :key="index">
         <!-- 布局 -->
         <!-- 左侧 -->
        <div class='left'>
            <img :src="item.cover.images.length?item.cover.images[0]:defaultImg" alt="">
            <div class='info'>
                <span class='title'>{{item.title}}</span>
                <el-tag :type="item.status|statusType" class='status'>{{item.status|statusText}}</el-tag>
                <span class='date'>{{item.pubdate}}</span>
            </div>
        </div>
        <!-- 右侧 -->
        <div class='right'>
            <span><i class="el-icon-edit"></i>修改</span>
            <span><i class="el-icon-delete"></i>删除</span>
        </div>
     </div>
     <!-- 分页 -->
         <el-row type='flex' justify="center" style='margin:10px 0'>
       <el-pagination
       @current-change="changePage"
       :current-page="page.currentPage"
       :page-size="page.pageSize"
  background
  layout="prev, pager, next"
  :total="page.total">
</el-pagination>
     </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        status: 5, // 文章状态
        channel_id: null, // 频道id 这里必须写null而不能写空串否则组装参数会出错
        date: []
      },
      list: [],
      channels: [], // 接收频道数据
      defaultImg: require('../../assets/img/abb.jpg'), // 将图片转为base64
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    // 绑定状态发生变化事件
    changeCondition () {
      // 开始时间
      // var beginDate = this.formData.date.length ? this.formData[0].date[0] : null
      // 结束时间
      // var endDate = this.formData.date.length > 1 ? this.formData[1].date[1] : null

      this.page.currentPage = 1 // 条件改变 默认会第一页
      this.queryArticles()
    },
    // 分页
    changePage (newPage) {
      this.page.currentPage = newPage // 赋值最新页码
      this.queryArticles()
    },
    // 为分页携带条件封装
    queryArticles () {
      // 组装请求参数
      let params = {
        status: this.formData.status === 5 ? null : this.formData.status,
        channel_id: this.formData.channel_id,
        begin_pubdate: this.formData.date.length ? this.formData.date[0] : null,
        end_pubdate: this.formData.date.length > 1 ? this.formData.date[1] : null,
        page: this.page.currentPage,
        per_page: this.page.pageSize
      }
      this.getArticles(params)
    },
    // 获取数据
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(result => {
        //   获取文章列表
        this.list = result.data.results
        // 赋值记录总数
        this.page.total = result.data.total_count
      })
    },
    // 获取频道列表
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then((result) => {
        this.channels = result.data.channels // 获取channels
      })
    }
  },
  created () {
    this.getArticles() // 获取文章
    this.getChannels() // 获取频道
  },
  // 过滤器
  filters: {
    statusText (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        case 4:
          return '已删除'
      }
    },
    // 处理状态的显示样式
    statusType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return 'success'
        case 3:
          return 'danger'
        case 4:
          return 'danger'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.total {
    border-bottom: 1px dashed #ccc;
    height:50px;
    line-height: 50px;
}
.article-item {
    display: flex;
    justify-content: space-between;
    padding: 20px 10px;
    border-bottom: 1px solid  #f2f3f5;
    .left {
        display: flex;
        img {
            width: 180px;
            height:100px;
            border-radius: 4px;
        }
        .info {
            height: 100px;
            display: flex;
            flex-direction: column;
            margin-left:10px;
            justify-content: space-around;
            .date {
                color:#999;
                font-size:12px;
            }
            .title {
                font-size:14px;
            }
            .status {
                width: 60px;
                text-align: center
            }
        }
    }
    .right {
        font-size: 12px;
        span {
            margin-right:8px;
        }
    }
}
</style>
