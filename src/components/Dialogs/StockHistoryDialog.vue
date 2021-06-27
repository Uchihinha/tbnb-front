<template>
    <el-dialog
        title="Stock History"
        :model-value="visible"
        width="30%"
        :before-close="handleClose"
	>
        <div class="timeline-container">
            <el-timeline v-if="events.length">
                <el-timeline-item
                v-for="(item, index) in events"
                :key="index"
                :timestamp="$filters.toDatetime(item.created_at)">
                    {{ item.old_quantity }} <i class="el-icon-right"></i> {{ item.new_quantity }}
                </el-timeline-item>
            </el-timeline>

			<span v-else>No data found :(</span>
        </div>
    </el-dialog>
</template>

<script>
export default {
	props: {
		visible: Boolean,
		events: Array
	},
	methods: {
		handleClose() {
			this.$emit('close');
		},
	},
	watch: {
		events() {
			console.log(this.events);
		}
	}
};
</script>

<style lang="scss" scoped>
	.timeline-container {
		display: flex;
		justify-content: center;
	}

	el-timelime-item {
		text-align: left;
	}
</style>