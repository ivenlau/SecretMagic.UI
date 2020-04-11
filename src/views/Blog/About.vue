<template>
  <div class="container">
    <el-row type="flex" justify="center">
      <el-col :span="18">
        <el-row>
          <el-col>
            <h1>Performed by Xiao Mo</h1>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <video src="http://211.159.219.191/wp-content/uploads/2019/09/Demo.mp4" autoplay="" controls="" controlslist="nodownload" />
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <div style="display:flex;">
              <p>Email: </p><el-link href="mailto:ivenlau@qq.com">ivenlau@qq.com</el-link>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <h1>Proferssional software engineer and part-time magician.</h1>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
  .container{
    width: 100%;
    text-align: left;
    padding-top: 20px;
    overflow: auto;
  }
</style>
