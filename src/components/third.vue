<template>
  <div id="third">
    <el-row>
      <el-col :xs="24" :sm="12" :md="6" v-for="article in articles" :key="article.value">
        <div class="grid-content overflow movelist">
          <p>{{article.title}}</p>
          <a :href="article.alt" target="_blank">
            <img v-bind:src="article.images['large']">
          </a>
        </div>
      </el-col>
    </el-row>
    <el-row class="loadmore">
      <el-button type="success" v-show="showPrev" round @click="prevPage()">上一页</el-button>
      <el-button type="success" v-show="showNext" round @click="nextPage()">下一页</el-button>
      <el-tag type="info" class="pageNums">第{{pageIndex}}页</el-tag>
    </el-row>

    <div v-if="loading" class="mask" v-cloak>
      <span>Loading...</span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        url: "https://api.douban.com/v2/movie/top250?start=",
        pageIndex: 1,
        currentDate: new Date().toString(),
        articles: [],
        articleTitle: '',
        showPrev: false,
        showNext: true,
        loading: false
      }
    },
    created() {
      this.loadData()
    },
    mounted() {
      console.log('mount')
    },
    methods: {
      loadData() {
        // this.url = this.url + '?count=' + 24 * this.pageIndex
        // this.pageIndex++;
        // let url = this.url + this.pageIndex * 24;
        let url;
        if (this.pageIndex === 1) {
          url = this.url + '0&count=' + this.pageIndex * 24
        } else {

          let lastNum = this.pageIndex * 24 ? this.pageIndex * 24 < 250 : 250;
          url = this.url + (this.pageIndex - 1) * 24 + '&count=' + lastNum
        }
        console.log('url:', url)
        this.$http.jsonp(url, {
          before: () => {
            this.loading = true
          }
        }, {
          headers: {},
          emulateJSON: true
        }).then(function(response) {
          this.articles = response.data.subjects;
          this.articleTitle = response.data.title;
          this.loading = false;
        }, function(response) {
          console.log(response);
        });
      },
      nextPage() {
        this.showPrev = true
        let lastNum = this.pageIndex * 24 ? this.pageIndex * 24 < 250 : 250;
        if (lastNum < 250) {
          this.pageIndex++;
        } else {
          this.showNext = false
        }
      },
      prevPage() {
        if (this.pageIndex > 1) {
          this.pageIndex--;
        }
      }
    },
    watch: {
      pageIndex() {
        console.log('pageIndex', this.pageIndex)
        this.loadData()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .width-row {
    max-width: 880px;
  }

  .movelist {
    padding: 10px;
    box-sizing: border-box;
    img {
      max-height: 300px;
    }
  }

  .loadmore {
    position: relative;
    margin-top: 20px;
  }

  .pageNums {
    float: right;
    //right: 50px;
    &:after {
      content: '';
      display: block;
      height: 0;
      visibility: hidden;
      clear: both;
    }
  }


  .mask {
    background: gray;
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    z-index: 20;
    filter: alpha(opacity=60);
    opacity: 0.5 !important;
  }
</style>

