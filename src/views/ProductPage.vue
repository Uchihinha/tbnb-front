<template>
	<div class="product-container" v-loading="isLoading">
		<el-empty description="Product not found :(" v-if="notFound">
			<el-button type="primary" @click="$router.push('/products')"><i class="el-icon-back"></i> Back to List</el-button>
		</el-empty>

		<h1 class="product-container__title" v-if="!notFound && !isLoading">
			<span>
				Edit #{{$route.params.id}}
			</span>
			<span class="product-container__title--icon">
				<el-button @click="handleStockHistory" circle type="primary" icon="el-icon-takeaway-box" />
			</span>
		</h1>
		<product-form v-show="!notFound && !isLoading" :data="product" @saveProduct="submit" @cancel="cancel" />
		
		<stock-history-dialog :events="stockHistory" @close="isStockHistoryDialogVisible = false" :visible="isStockHistoryDialogVisible" />
	</div>
</template>

<script>
import { findProduct, getStockHistory } from '../services/product';
import ProductForm from '../components/ProductForm.vue';
import { updateProduct } from '../services/product';
import StockHistoryDialog from '../components/Dialogs/StockHistoryDialog.vue';

export default {
	title: 'Products - Edit',
	components: { ProductForm, StockHistoryDialog },
	data() {
		return {
			product: {},
			isStockHistoryDialogVisible: false,
			stockHistory: [],
			isLoading: true,
			notFound: false
		};
	},
	methods: {
		submit(params) {
			this.isLoading = true;

			updateProduct(this.$route.params.id, params)
				.then(() => {
					this.$notify({
						title: 'Success',
						message: 'Successfully updated product!',
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
		},
		handleStockHistory() {
			getStockHistory(this.$route.params.id)
				.then(res => {
					this.stockHistory = res.data;
				});
			this.isStockHistoryDialogVisible = true;
		}
	},
	beforeCreate() {
		this.isLoading = true;

		findProduct(this.$route.params.id)
			.then(res => {
				this.product = res.data;
			})
			.catch(() => {
				this.notFound = true;
			})
			.finally(() => this.isLoading = false);
	},
};
</script>

<style lang="scss">
	.product-container {
		&__title {
			position: relative;

			&--icon {
				position: absolute;
				bottom: 10%;
				right: 0;
			}
		}
	}
	
</style>