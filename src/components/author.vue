<template>
	<div id="author">
		<h2>念念不忘，必有回响</h2>
		<p>Written by {{author}}</p>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				author:"@chiwent"
			}
		}
	}
</script>

<style>
	#author{
		font-family: "Helvetica Neue",Helvetica,"Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
		font-size: 16px;
		color: rgb(12, 94, 216);
	}
	#author h2{
		color: #324057;
	}
</style>
