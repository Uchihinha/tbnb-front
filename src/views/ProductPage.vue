<template>
	<div class="product-container">
		<h1>Edit #{{$route.params.id}}</h1>
		<product-form :data="product" @saveProduct="submit" @cancel="cancel" />
	</div>
</template>

<script>
import { findProduct } from '../services/product';
import ProductForm from '../components/ProductForm.vue';
import { updateProduct } from '../services/product';

export default {
	components: { ProductForm },
	data() {
		return {
			product: {}
		};
	},
	methods: {
		submit(params) {
			updateProduct(this.$route.params.id, params)
				.then(() => {
					this.$notify({
						title: 'Success',
						message: 'Successfully updated product!',
						type: 'success'
					});
				})
				.catch((err) => {
					let message = err.response.data.errors
						? err.response.data.errors[Object.keys(err.response.data.errors)[0]]
						: 'An unexpected error occurred';

					this.$notify.error({
						title: 'Error',
						message: message
					});
				});
		},
		cancel() {
			this.$router.push('/products');
		}
	},
	mounted() {
		findProduct(this.$route.params.id).then(res => {
			this.product = res.data;
		});
	},
};
</script>