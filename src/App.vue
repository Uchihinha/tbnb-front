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

<style>
html {
	background-color: #bdddff;
}

body {
	font-family: Avenir, Helvetica, Arial, sans-serif;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
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
	box-shadow: 0px 0px 10px 0px;
}
</style>
