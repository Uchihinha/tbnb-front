<template>
    <el-pagination
        :page-size="2"
        :pager-count="5"
        layout="prev, pager, next"
        :total="total"
		@current-change="handleCurrentChange"
		class="pagination"
	>
    </el-pagination>
</template>

<script>
export default {
	props: {
		total: Number
	},
	methods: {
		handleCurrentChange(val) {
			this.$emit('change-page', val);
		}
	}
};
</script>

<style lang="scss">
.pagination {
	text-align: right;
    margin-top: 10px;
}

</style>
