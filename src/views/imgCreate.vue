<template>
  <mainContainer>
    <div class="form-con">
      <el-form ref="form"
               :model="params" label-width="100px"
               label-position="left" size="small">
        <el-form-item label="图片名称：">
          <div class="input-itm">
            <el-input placeholder="请输入图片名称" type="text"
                      v-model="params.name"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="图片：">
          <div class="input-itm">
            <el-input placeholder="请输入图片地址" type="text"
                      v-model="params.url"></el-input>
          </div>
        </el-form-item>
        <div class="btns">
          <el-button type="primary" size="small" @click="save">保存</el-button>
        </div>
      </el-form>
    </div>

    <el-dialog
      class="img-preview-dialog"
      :visible.sync="dialogVisible"
      width="500px"
      left
    >
      <div class="img-preview-dialog-body">
        <img :src="imgUrl">
      </div>
    </el-dialog>

  </mainContainer>
</template>
<script>
import mainContainer from '@/components/mainContainer'
import * as url from '@/common/url'
import * as api from '@/common/api'

export default {
  name: 'imgCreate',
  data() {
    return {
      params: {
        name: '',
        url: ''
      },
      url,
      headers: {},
      imgUrl: '',
      dialogVisible: false
    }
  },
  components: {
    mainContainer
  },
  created() {
  },
  mounted() {
    let jwtToken = localStorage.getItem('jwt-token')
    this.headers.authorization = jwtToken ? 'Bearer ' + jwtToken : ''
    // this.imgGetOne()

    if(this.$route.query) {
      this.params = this.$route.query
    }
  },
  methods: {
    toggleImg(url, flag) {
      this.imgUrl = url
      this.dialogVisible = flag || false
    },
    save() {
        if (!this.params.name) {
        this.$message.error('请填写图片名称')
        return
      }
      if (!this.params.url) {
        this.$message.error('请填写图片地址')
        return
      }
      if (this.$route.query.id) {
        this.imgUpdateOne()
      } else {
        this.imgCreateOne()
      }
    },
    uploadImgSuccess(res) {
      if (res.code === 0) {
        this.params.url = res.data.url
      }
    },
    beforeUploadImg(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!(isJPG || isPNG)) {
        this.$message.error('上传头像图片只能是 JPG PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return (isPNG || isJPG) && isLt2M
    },
    imgCreateOne() {
      api.imgCreateOne({data: this.params}).then((res) => {
        if (res.data.code === 1) {
          this.$message.success('保存成功')
          this.$router.go(-1)
        }
      }).catch(() => {
      })
    },
    imgGetOne() {
      if (!this.$route.query.id) {
        return
      }
      api.imgGetOne({params: {_id: this.$route.query.id}, method: 'get'}).then((res) => {
        if (res.data.code === 0) {
          this.params = res.data.data
        }
      }).catch(() => {
      })
    },
    imgUpdateOne() {
      api.imgUpdateOne({params: {_id: this.$route.query.id}, data: this.params}).then((res) => {
        if (res.data.code === 1) {
          this.$router.go(-1)
        }
      }).catch(() => {
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .form-con {
    width: 100%;
    background: #fff;
    padding: 20px;
    box-sizing: border-box;

    .input-itm {
      width: 178px;
    }

  }
</style>
<style lang="scss">
  .form-con {
    .avatar-uploader {
      display: inline-block;
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
      display: inline-block;
      margin-right: 18px;
    }
  }

  .img-preview-dialog {

    .img-preview-dialog-body {
      width: 100%;

      img {
        width: 100%;
      }
    }
  }

</style>
