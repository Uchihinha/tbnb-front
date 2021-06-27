<template>
    <div class="list-container__table">
		<el-table :data="tableData" @selection-change="handleSelectionChange">
			
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
				<template #default="scope">
					<el-button size="mini" @click="handleStockHistory(scope.row.id)" icon="el-icon-takeaway-box" />
					<el-button size="mini" @click="handleEdit(scope.row.id)" icon="el-icon-edit-outline" />
					<el-button size="mini" @click="handleDelete(scope.row.id)" icon="el-icon-delete" type="danger" />
				</template>
			</el-table-column>

		</el-table>

		<paginator @change-page="changePage" :total="totalTableData" />
	</div>
</template>

<script>
import Paginator from '../Paginator.vue';
export default {
	components: { Paginator },
	props: {
		tableData: Array,
		totalTableData: {
			type: Number,
			default: 0
		}
	},
	methods: {
		handleSelectionChange(val) {
			this.$emit('handle-selection-change', val);
		},
		handleStockHistory(id) {
			this.$emit('stock-history', id);
		},
		handleEdit(id) {
			this.$emit('edit', id);
		},
		handleDelete(id) {
			this.$emit('delete', id);
		},
		changePage(page) {
			this.$emit('change-page', page);
		},
	},
    
};
</script>

<style lang="scss">
    .list-container {

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
	}
</style>