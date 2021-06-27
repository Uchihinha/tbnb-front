<template>
    <div class="list-container__header">
		<el-row :gutter="20" class="list-container__row">
			<el-col :span="12">
				<el-input prefix-icon="el-icon-search" class="list-container__search-input grid-content" placeholder="What are you looking for?" />
			</el-col>

			<el-col :span="12" class="list-container__buttons">
				<el-button @click="showBulkUpdate" type="primary" circle icon="el-icon-edit-outline" :disabled="disabledBulkButton" />
				<el-button @click="createNew" type="primary" round icon="el-icon-plus">Create New</el-button>
			</el-col>
		</el-row>
	</div>
</template>
<script>
export default {
	props: {
		disabledBulkButton: Boolean
	},
	methods: {
		showBulkUpdate() {
			this.$emit('show-bulk-update');
		},
		createNew() {
			this.$emit('create-new');
		}
	}
};
</script>

<style lang="scss">
	.list-container {
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
	}

</style>