<template>
<div class="list-container">

	<div class="list-container__header">
		<el-input prefix-icon="el-icon-search" class="list-container__search-input" placeholder="What are you looking for?" v-model="search" />
		<el-button  @click="createNew" type="primary" round icon="el-icon-plus">Create New</el-button>
	</div>

	<div class="list-container__table">
		<el-table :data="products">
			<el-table-column label="#" prop="id" />

			<el-table-column label="Name" prop="name" />

			<el-table-column label="Date" prop="created_at" />

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
</div>
</template>

<script>
import { getProducts } from '../services/product/index';

export default {
	data() {
		return {
			search: '',
			products: []
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
			display: flex;
			justify-content: space-between;
		}

		&__search-input {
			max-width: 20%;
			display: flex;
		}
	}
</style>