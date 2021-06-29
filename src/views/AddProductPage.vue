<template>
    <div v-loading="isLoading" class="product-container">
		<h1>New Product</h1>
        <product-form @saveProduct="submit" @cancel="cancel" />
	</div>
</template>

<script>
import { createProduct } from '../services/product';
import ProductForm from '../components/ProductForm.vue';

export default {
	title: 'Stock Management - New',
	components: { ProductForm },
	data() {
		return {
			isLoading: false
		};
	},
	methods: {
		submit(params) {
			this.isLoading = true;

			createProduct(params)
				.then(() => {
					this.$notify({
						title: 'Success',
						message: 'Successfully created product!',
						type: 'success'
					});

					this.$router.push('/products');
				})
				.catch((err) => {
					let message = err.response.data.errors
						? err.response.data.errors[Object.keys(err.response.data.errors)[0]]
						: 'An unexpected error occurred';

					this.$notify.error({
						title: 'Error',
						message: message
					});
				})
				.finally(() => this.isLoading = false);
		},
		cancel() {
			this.$router.push('/products');
		}
	}
};
</script>