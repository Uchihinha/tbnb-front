<template>
	<router-view v-slot="{ Component }">
		<transition name="fade" mode="out-in">
			<component :is="Component" />
		</transition>
	</router-view>
</template>

<script>

export default {
	name: 'App',
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Poppins');

* {
	font-family: Poppins, Avenir, Helvetica, Arial, sans-serif !important;
}

html {
	background-color: #bdddff;
}

#app {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 2%;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease;
}


.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.product-container {
	max-width: 50%;
	margin: 0 auto;
	padding: 30px;
	background-color: white;
	border-radius: 3%;
	box-shadow: 
		rgba(64, 158, 255, 0.4) -5px 5px, 
		rgba(64, 158, 255, 0.3) -10px 10px, 
		rgba(64, 158, 255, 0.2) -15px 15px, 
		rgba(64, 158, 255, 0.1) -20px 20px, 
		rgba(64, 158, 255, 0.05) -25px 25px;
}

.el-loading-mask {
	border-radius: inherit;
}
</style>
