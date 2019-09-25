<template>
  <el-tabs>
      <el-tab-pane label="素材库">
          <div class="imgs-list">
              <el-card class="imgs-item" v-for="item in list" :key="item.id">
              <!-- 点击时传出图片地址-->
                  <img @click="clickImg(item)" :src="item.url" alt="">
              </el-card>
          </div>
          <el-row type="flex" justify="center">
            <el-pagination
                background
               layout="prev, pager, next"
               :total="page.total"
               :current-page="page.currentPage"
               :page-size="page.pageSize"
               @current-change="changePage"
               >
             </el-pagination>
          </el-row>
      </el-tab-pane>
        <el-tab-pane label="上传图片">
            <!-- 自定义上传 -->
            <el-upload :show-file-list="false" action="" :http-request="uploadImg">
             <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      // 全部素材
      list: [],
      // 分页三要素数据
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 8
      }
    }
  },
  methods: {
    //   上传用户素材
    uploadImg (params) {
      let data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(result => {
        //   得到一个线上地址
        this.$emit('seletcOneImg', result.data.url)
      })
    },
    // 点击素材图片触发
    clickImg (item) {
      this.$emit('seletcOneImg', item.url) // 子传父的自定义事件
    },
    // 页码改变事件
    changePage (newPage) {
      this.page.currentPage = newPage // 获取最新页
      this.getAllimg()
    },
    // 获取所有图片
    getAllimg () {
      this.$axios({
        url: '/user/images',
        params: { collect: false, page: this.page.currentPage, per_page: this.page.pageSize }
      }).then((result) => {
        this.list = result.data.results
        // 赋值总条数（分页图片总条数）
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getAllimg()
  }
}
</script>

<style lang='less' scoped>
.imgs-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .imgs-item {
        width: 120px;
        height:100px;
        margin:10px;
        img {
            width:100%;
            height: 100%;
        }
    }
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
