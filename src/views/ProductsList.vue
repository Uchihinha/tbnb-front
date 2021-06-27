<template>
<div class="list-container">
	<h1 class="list-container__title">
		<span>
			Products List
		</span>
		<span class="list-container__title--total">
			{{ totalProducts }} Total Items
		</span>
	</h1>

	<table-header @show-bulk-update="showBulkUpdate" @create-new="createNew" :disabledBulkButton="!selectedItems.length" />

	<table-body 
		:totalTableData="totalProducts" 
		:tableData="products" 
		@selection-change="handleSelectionChange"
		@stock-history="handleStockHistory"
		@edit="handleEdit"
		@delete="handleDelete"
		@change-page="changePage"
	/>

	<bulk-update-dialog @save="saveBulk" @close="isBulkUpdateDialogVisible = false" :visible="isBulkUpdateDialogVisible" />
	<stock-history-dialog :events="stockHistory" @close="isStockHistoryDialogVisible = false" :visible="isStockHistoryDialogVisible" />
</div>
</template>

<script>
import BulkUpdateDialog from '../components/Dialogs/BulkUpdateDialog.vue';
import StockHistoryDialog from '../components/Dialogs/StockHistoryDialog.vue';
import TableBody from '../components/Table/TableBody.vue';
import TableHeader from '../components/Table/TableHeader.vue';
import { getProducts, bulkUpdateProduct, getStockHistory, deleteProduct } from '../services/product/index';

export default {
	components: { BulkUpdateDialog, StockHistoryDialog, TableHeader, TableBody },
	data() {
		return {
			search: '',
			products: [],
			totalProducts: 0,
			selectedItems: [],
			isBulkUpdateDialogVisible: false,
			isStockHistoryDialogVisible: false,
			currentPage: 1,
			paginate: 2,
			stockHistory: []
		};
	},
	methods: {
		handleEdit(id) {
			this.$router.push(`/products/${id}`);
		},
		handleDelete(id) {
			this.$confirm('Are you sure to delete the product?', `Delete Product #${id}`, {
				confirmButtonText: 'Yes',
				cancelButtonText: 'No, cancel',
			})
				.then(() => {
					deleteProduct(id)
						.then(() => {
							this.getProducts();

							this.$notify({
								title: 'Success',
								message: 'Successfully deleted product!',
								type: 'success'
							});
						})
						.catch(() => {
							this.$notify.error({
								title: 'Error',
								message: 'An unexpected error occurred'
							});
						});
				})
				.catch(() => {});
		},
		getProducts() {
			getProducts(this.currentPage, this.paginate).then((res) => {
				this.products = res.data.data;
				this.totalProducts = res.data.total;
			});
		},
		createNew() {
			this.$router.push('/products/new');
		},
		handleSelectionChange(val) {
			this.selectedItems = val.map(product => product['id']);
		},
		showBulkUpdate() {
			this.isBulkUpdateDialogVisible = true;
		},
		saveBulk(params) {
			params.products = this.selectedItems;

			bulkUpdateProduct(params)
				.then(() => {
					this.isBulkUpdateDialogVisible = false;

					this.getProducts();

					this.$notify({
						title: 'Success',
						message: 'Successfully updated products!',
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
		changePage(newPage) {
			this.currentPage = newPage;
			this.getProducts();
		},
		handleStockHistory(id) {
			getStockHistory(id)
				.then(res => {
					this.stockHistory = res.data;
				});
			this.isStockHistoryDialogVisible = true;
		}
	},
	mounted() {
		this.getProducts();
	}
};
</script>

<style lang="scss" scoped>
	.list-container {
		max-width: 90%;
		margin: 0 auto;

		&__title {
			text-align: left;
			position: relative;

			&--total {
				font-size: 1rem;
				position: absolute;
				bottom: 0;
				right: 0;
			}
		}
	}
</style>