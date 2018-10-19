<template>
	<div id="second">
		<el-row class="width-row">
			<el-col>
				<div class="grid-content bg-purple-dark">
					<el-card class="box-card">
						<div slot="header" class="clearfix">
							<h2 style="line-height: 36px;">{{articleTitle}}</h2>
						</div>
						<ol class="text item list-style">
							<li v-for="article in articles" :key="article.value">
								{{article.title}}
							</li>
						</ol>
						</el-card>
				</div>
			</el-col>
		</el-row>

	</div>
</template>

<script>
	export default{
		data(){
			return{
				articles:[],
				articleTitle:''
			}
		},
		mounted: function() {
			this.$http.jsonp('https://api.douban.com/v2/movie/in_theaters?city=广州', {}, {
				headers: {
				},
				emulateJSON: true
			}).then((response) =>{
      // 响应成功回调(简洁的ES 6的Lambda写法)
      this.articles = response.data.subjects;
      this.articleTitle=response.data.title;
  }, (response)=> {
        // 响应错误回调
        console.log(response)
    });
		}
	}
</script>

<style>
	#second h1{
		line-height: 20px;
	}

	.item {
		padding: 10px 3px;
	}
	.list-style{
    list-style-position:inside;
		font-size: 18px;
		text-align: center;
		/* margin-left:330px; */
	}
</style>
