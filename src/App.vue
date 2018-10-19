<template>
  <div id="app">
    <el-row>
      <h1>{{ msg }}</h1>
      <!-- <p><img src="./assets/fanhai.jpg"  alt="fanhai"></p> -->
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="item in imgList" :key="item">
          <img :src="item" alt="banner">
        </el-carousel-item>
      </el-carousel>
      <Author></Author>
      <el-row type="flex" class="row-bg" justify="center">
        <el-tabs v-model="activeName" class="center" center="true" :stretch="true" style="width:100%;">
          <el-tab-pane label="你的名字" name="first">
            <First></First>
          </el-tab-pane>
          <el-tab-pane label="正在热映" name="second">
            <Second></Second>
          </el-tab-pane>
          <el-tab-pane label="电影Top250" name="third">
            <Third></Third>
          </el-tab-pane>
        </el-tabs>
      </el-row>
    </el-row>
    <back-to-top>
      <el-button type="danger" circle style="width: 50px; height:50px;">Top</el-button>
    </back-to-top>
  </div>
</template>

<script>
  import Author from './components/author.vue'
  import Second from './components/second.vue'
  import Third from './components/third.vue'
  import First from './components/first.vue'

  export default {
    data() {
      return {
        msg: 'Vue2 - 豆瓣电影',
        activeName: 'first',
        imgList: [require('./assets/banner-1.jpeg'), require('./assets/banner-2.jpeg'), require('./assets/banner-3.jpeg')]
      }
    },

    // 注册组件
    components: {
      Author,
      Second,
      First,
      Third
    },

    methods: {
      startHacking() {
        this.$notify({
          title: 'It Works',
          message: 'We have laid the groundwork for you. Now it\'s your time to build something epic!',
          duration: 4000
        })
      }
    }
  }
</script>

<style>
  body {
    font-family: Helvetica, sans-serif;
    color: #1F2D3D;
    text-align: center;
  }

  .center {
    margin: 0 auto;
  }
</style>
