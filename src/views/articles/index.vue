<template>
  <el-card>
        <!--面包屑 -->
        <bread-crumb slot='header'>
           <template slot='title'>
               内容列表
           </template>
        </bread-crumb>
        <!-- 表单 -->
        <el-form style="margin-left:50px">
            <!-- 文章状态 -->
            <el-form-item label="文章状态:">
                 <el-radio-group>
                   <el-radio>全部</el-radio>
                   <el-radio>草稿</el-radio>
                   <el-radio>待审核</el-radio>
                   <el-radio>审核通过</el-radio>
                   <el-radio>审核失败</el-radio>

            </el-radio-group>
            </el-form-item>
            <el-form-item label="频道列表:">
                <!-- 频道列表 -->
                <el-select>
                </el-select>
            </el-form-item>
            <el-form-item label="时间选择:">
                 <el-date-picker
                   type="daterange"
                   start-placeholder="开始日期"
                   end-placeholder="结束日期">
          </el-date-picker>
            </el-form-item>
        </el-form>
          <!-- 主体内容 -->
     <div class='total'>共找到55091条符合条件的内容</div>
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
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      defaultImg: require('../../assets/img/abb.jpg') // 将图片转为base64
    }
  },
  methods: {
    getArticles () {
      this.$axios({
        url: '/articles'
      }).then(result => {
        //   获取文章列表
        this.list = result.data.results
      })
    }
  },
  created () {
    this.getArticles() // 获取文章
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
