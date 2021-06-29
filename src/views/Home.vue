<template>
	<div class="home">
		<img class="home__image" src="@/assets/img/home.png" alt="">
		<h1>Welcome to my Stock Management System</h1>
		<h2>
			Developed with 
			<el-link type="primary" target="_blank" href="https://v3.vuejs.org/">VueJS 3</el-link> + 
			<el-link type="primary" target="_blank" href="https://element-plus.org/#/en-US">Element Plus</el-link> + 
			<el-link type="primary" target="_blank" href="https://www.cypress.io/">Cypress</el-link>
		</h2>
		<h2>Repo link: <el-link type="primary" target="_blank" href="https://github.com/Uchihinha/tbnb-front">https://github.com/Uchihinha/tbnb-front</el-link></h2>
		<el-button @click="$router.push('products')" type="primary">Let's Go <i class="el-icon-right"></i></el-button>
	</div>
</template>

<script>

export default {
	title: 'Stock Management',
	name: 'Home',
};
</script>

<style lang="scss">
	.home {
		width: 800px;
		margin: 0;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 10px;
		padding: 30px;
		background-color: white;
		box-shadow: 
			rgba(64, 158, 255, 0.4) -5px 5px, 
			rgba(64, 158, 255, 0.3) -10px 10px, 
			rgba(64, 158, 255, 0.2) -15px 15px, 
			rgba(64, 158, 255, 0.1) -20px 20px, 
			rgba(64, 158, 255, 0.05) -25px 25px;

		&__image {
			max-width: 200px;
		}

		a {
			font-size: 1.5rem;
			display: contents;
		}
	}
</style>
