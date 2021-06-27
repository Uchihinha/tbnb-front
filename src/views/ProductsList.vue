<template>
<div class="list-container">
	<h1 class="list-container__title">Products List</h1>

	<div class="list-container__header">
		<el-row :gutter="20" class="list-container__row">
			<el-col :span="12">
				<el-input prefix-icon="el-icon-search" class="list-container__search-input grid-content" placeholder="What are you looking for?" v-model="search" />
			</el-col>

			<el-col :span="12" class="list-container__buttons">
				<el-button @click="showBulkUpdate" type="primary" circle icon="el-icon-edit-outline" :disabled="!selectedItems.length" />
				<el-button @click="createNew" type="primary" round icon="el-icon-plus">Create New</el-button>
			</el-col>
		</el-row>
	</div>

	<div class="list-container__table">
		<el-table :data="products" @selection-change="handleSelectionChange">
			
			<el-table-column type="selection" width="55" />

			<el-table-column label="#" prop="id" width="60" />

			<el-table-column label="Name" prop="name" />

			<el-table-column label="Date" prop="created_at" >
				<template #default="scope">
					{{ $filters.toDatetime(scope.row.created_at) }}
				</template>
			</el-table-column>

			<el-table-column label="Price" prop="price" >
				<template #default="scope">
					{{ $filters.toCurrency(scope.row.price) }}
				</template>
			</el-table-column>

			<el-table-column label="Stock" prop="stock_quantity" />
			
			<el-table-column align="right">
				<!-- <template #header>
					<el-input
					v-model="search"
					size="mini"
					placeholder="Type to search"/>
				</template> -->
				<template #default="scope">
					<el-button size="mini" @click="handleEdit(scope.row.id)">Edit</el-button>
					<!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button> -->
				</template>
			</el-table-column>

		</el-table>
	</div>

	<bulk-update-dialog @save="saveBulk" @close="isBulkUpdateDialogVisible = false" :visible="isBulkUpdateDialogVisible" />
</div>
</template>

<script>
import BulkUpdateDialog from '../components/BulkUpdateDialog.vue';
import { getProducts, bulkUpdateProduct } from '../services/product/index';

export default {
	components: { BulkUpdateDialog },
	data() {
		return {
			search: '',
			products: [],
			selectedItems: [],
			isBulkUpdateDialogVisible: false
		};
	},
	methods: {
		handleEdit(id) {
			this.$router.push(`/products/${id}`);
		},
		// handleDelete(index, row) {
		// 	console.log(index, row);
		// },
		getProducts() {
			getProducts().then((res) => {
				this.products = res.data.data;
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
		}

		&__header {
			border-radius: 10px;
			padding: 30px;
			background-color: white;
			box-shadow: 
				rgba(64, 158, 255, 0.4) -5px 5px, 
				rgba(64, 158, 255, 0.3) -10px 10px, 
				rgba(64, 158, 255, 0.2) -15px 15px, 
				rgba(64, 158, 255, 0.1) -20px 20px, 
				rgba(64, 158, 255, 0.05) -25px 25px;
			margin-bottom: 3vh;

			.list-container__row {
				.list-container__buttons {
					display: flex;
					justify-content: flex-end;
				}

			}
		}

		&__table {
			border-radius: 10px;
			padding: 30px;
			background-color: white;
			box-shadow: 
				rgba(64, 158, 255, 0.4) -5px 5px, 
				rgba(64, 158, 255, 0.3) -10px 10px, 
				rgba(64, 158, 255, 0.2) -15px 15px, 
				rgba(64, 158, 255, 0.1) -20px 20px, 
				rgba(64, 158, 255, 0.05) -25px 25px;
		}

		&__search-input {
			max-width: 50%;
			display: flex;
		}
	}
</style>