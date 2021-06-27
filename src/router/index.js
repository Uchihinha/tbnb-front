import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import ProductsList from '../views/ProductsList.vue';
import ProductPage from '../views/ProductPage.vue';
import AddProductPage from '../views/AddProductPage.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/products',
		name: 'ProductsList',
		component: ProductsList
	},
	{
		path: '/products/:id',
		name: 'ProductPage',
		component: ProductPage
	},
	{
		path: '/products/new',
		name: 'AddProductPage',
		component: AddProductPage
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

export default router;
