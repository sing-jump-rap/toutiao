<template>
  <el-card v-loading="loading">
      <bread-crumb slot="header">
        <template slot="title">
            发布文章
        </template>
      </bread-crumb>
             <!-- 表单 -->
       <el-form ref="publishForm" :model="formData" :rules="publishRules" style='margin-left:100px' label-width="100px">
            <el-form-item prop="title" label="标题">
                <el-input v-model="formData.title" style='width:400px'></el-input>
            </el-form-item>
            <el-form-item prop="content" label="内容">
                <quill-editor v-model="formData.content"  style='height:300px'></quill-editor>
            </el-form-item>
             <el-form-item label="封面"  prop="cover" style='margin-top:120px'>
                <el-radio-group @change="changeType" v-model="formData.cover.type">
                    <el-radio :label="1">单图</el-radio>
                    <el-radio :label="3">三图</el-radio>
                    <el-radio :label="0">无图</el-radio>
                    <el-radio :label="-1">自动</el-radio>
                </el-radio-group>
            </el-form-item>
            <!-- 封面组件 传递父组件的images给子组件-->
            <cover-image @selectImg="changImg" :images="formData.cover.images"></cover-image>
            <el-form-item label="频道" prop="channel_id">
                <el-select v-model="formData.channel_id">
                    <el-option v-for="item in channels" :key="item.id" :value="item.id" :label="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' @click="publish(false)">发布文章</el-button>
                <el-button @click="publish(true)">存入草稿</el-button>
            </el-form-item>

       </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [],
      // 表单对象
      formData: {
        title: '', // 标题
        content: '', // 内容
        channels_id: null, // 频道id
        // 封面
        cover: {
          type: 0,
          images: []
        }
      },
      // 校验规则
      publishRules: {
        title: [{ required: true, message: '标题不能为空' }, {
          // 最小长度 min  最大长度max
          min: 5, max: 30, message: '标题长度要控制在5到30个字符之间'
        }],
        content: [{ required: true, message: '内容不能为空' }],
        channel_id: [{ required: true, message: '频道不能为空' }]
      },
      // 遮罩
      loading: false
    }
  },
  methods: {
    // 接收 更改image,更改时注意vue更新原理，不能直接用数组的索引赋值
    changImg (url, index) {
      this.formData.cover.images = this.formData.cover.images.map(function (item, i) {
        if (index === i) {
          // 说明找到了要修改的值
          return url
        }
        return item
      })

      // 简写
      // this.formData.cover.images = this.formData.cover.images.map((item, i) => i === index ? url : item)

      // 方法二
      // this.formData.cover.images.splice(index, 1, url)
    },
    // 类型改变事件
    changeType () {
      // 可以获取到最新的type 根据type进行images的长度变化
      if (this.formData.cover.type === 1) {
        this.formData.cover.images = ['']
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', '']
      } else {
        this.formData.cover.images = []
      }
    },
    // 获取频道数据
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then((result) => {
        this.channels = result.data.channels
      })
    },
    // 根据文章id获取文章详情
    getArticleById (articleId) {
      this.loading = true
      this.$axios({
        url: `/articles/${articleId}`
      }).then((result) => {
        this.formData = result.data
        this.loading = false
      })
    },
    // 发布文章
    publish (draft) {
      this.$refs.publishForm.validate((isOk) => {
        if (isOk) {
          // 定义articleId 有articleId为编辑，没有为修改
          let { articleId } = this.$route.params
          this.$axios({
            url: articleId ? `/articles/${articleId}` : '/articles',
            method: articleId ? 'put' : 'post',
            params: { draft }, // draft为true是草稿 false是内容
            data: this.formData
          }).then(() => {
            // 回内容列表
            this.$router.push('/home/articles')
          })
        }
      })
    }
  },

  created () {
    this.getChannels()// 获取频道
    // 获取id
    let { articleId } = this.$route.params // 有 articleId就是编辑 没articleId就是新增
    articleId && this.getArticleById(articleId) // 如果articleId存在才执行后界面的逻辑
  }
}

</script>

<style>

</style>
