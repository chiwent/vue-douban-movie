
<template>
  <div>
    <el-row>
      <el-row>
        <h2>电影信息搜索</h2>
      </el-row>
      <el-row>
        <el-input v-model="input" placeholder="请输入电影名称" @keyup.enter.native="loadData()" style="max-width: 500px;"></el-input>
      </el-row>
      <el-container>
        <el-header v-show="searched">搜索结果</el-header>
        <el-main class="container">
          <!-- <el-row v-if="!detailFlag" type="flex" justify="space-around"> -->
          <el-row v-if="!detailFlag">
            <el-col :xs="24" :sm="12" :md="6" v-for="item in results" :key="item.value">
              <div class="grid-content overflow movelist">
                <p style="text-align:center">{{item.title}}</p>
                <a :href="item.alt" target="_blank">
                  <img :src="item.images['large']">
                </a>
                <el-row>
                  <el-button type="primary" @click="showDetails(item)">查看</el-button>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <el-row v-else class="detail">
            <el-row>
              <h3>Detail</h3>
            </el-row>
            <el-row>
              <a :href="detail.alt" target="_blank">
                <img :src="detail.images['large']">
              </a>
            </el-row>
            <el-row>Year:
              <el-tag size="small">{{detail.year}}</el-tag>
              <a :href="detail.alt" target="_blank">豆瓣详情</a>
              <!-- <span>评分:{{detail.rating.average}}</span> -->
              <!-- <el-tooltip class="item" effect='dark' content='评分为0可能是因为评分样本较少' placement="top">{{detail.rating.average}}分</el-tooltip> -->
              <el-tooltip content="评分为0可能是因为评分样本较少" placement="top">
                <el-button size="small">{{detail.rating.average}}分</el-button>
              </el-tooltip>
            </el-row>
            <el-row>
              <el-tag v-for="item in detail.genres" type="primary" :key="item.value">
                {{ item }}
              </el-tag>
            </el-row>
            <el-row>
              <h4>演员表</h4>
            </el-row>
            <!-- <el-row type="flex" class="row-bg" justify="space-around"> -->
            <el-row>
              <el-col :xs="24" :sm="24" :md="8" v-for="item in detail.casts" :key="item.value">
                <div class="grid-content overflow movelist">
                  <p>{{item.name}}</p>
                  <a :href="item.alt" target="_blank">
                    <img :src="item.avatars['small']">
                  </a>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <h4>导演</h4>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
              <el-col v-for="item in detail.directors" :key="item.value">
                <div class="grid-content overflow movelist">
                  <p>{{item.name}}</p>
                  <a :href="item.alt" target="_blank">
                    <img :src="item.avatars['medium']">
                  </a>
                </div>
              </el-col>
            </el-row>
            <el-row>
              {{summary}}
            </el-row>
          </el-row>
        </el-main>
      </el-container>
      <el-row>
        <el-button type="success" round v-show="showPrev">上一页</el-button>
        <el-button type="success" round v-show="showNext">下一页</el-button>
      </el-row>
    </el-row>
  </div>
</template>

<script>
  import {
    MessageBox
  } from 'element-ui';
  export default {
    data() {
      return {
        url: 'https://api.douban.com/v2/movie/search?q=',
        input: '',
        results: [],
        searched: false,
        showPrev: false,
        showNext: false,
        detailFlag: false,
        count: 0,
        detail: [],
        summary: ['String']
      }
    },
    created() {
      // this.loadData()
      console.log('created')
    },
    mounted() {
      console.log('mounted')
    },
    methods: {
      loadData() {
        console.log('loading...')
        let url;
        url = this.url + this.input + '&start=0&count'
        this.$http.jsonp(url, {}, {
          headers: {
            'Referer': 'https://www.douban.com'
          },
          emulateJSON: true
        }).then(res => {
          this.results = res.data.subjects
          this.count = res.data.count
          // console.log('res:', this.results)
          // console.log('count:', this.count)
        }, err => {
          console.log(err)
          if (err) {
            this.$message({
              type: 'info',
              message: '请求错误'
            });
          }
        })
      },
      showDetails(item) {
        this.detailFlag = true;
        this.detail = item;
        let newUrl = 'https://api.douban.com/v2/movie/subject/' + item.id
        this.$http.jsonp(newUrl, {}, {
          headers: {
            'Referer': 'https://www.douban.com'
          },
          emulateJSON: true
        }).then(res => {
          this.summary = res.data.summary
        }, err => {
          console.log(err)
          if (err) {
            this.$message({
              type: 'info',
              message: '请求错误'
            });
          }
        })
      }
    }
  }
</script>

<style>
  a {
    text-decoration: none;
    color: orange;
  }

  img {
    max-height: 300px;
  }

  .detail .el-row {
    margin: 20px auto 20px auto;
  }
</style>
