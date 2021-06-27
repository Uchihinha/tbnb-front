
<template>
	<el-dialog
	title="Bulk Update"
	:model-value="visible"
	width="30%"
	:before-close="handleClose">

		<el-form 
			@keyup.enter="handleConfirm" 
			label-position="top" 
			ref="productForm" 
			:model="form" 
			label-width="120px"
			class="bulk-form"
		>
			<el-form-item label="Price" prop="price" class="bulk-form__input-label">
				<el-input v-model.lazy="form.price" v-money="moneyMask"></el-input>
			</el-form-item>

			<el-form-item label="Stock Quantity" prop="stock_quantity" class="bulk-form__input-label">
				<el-input-number v-mask="'#######'" v-model="form.stock_quantity" :min="1" :max="1000000" />
			</el-form-item>

			<el-form-item class="bulk-form__footer">
				<el-button class="bulk-form__button" type="primary" @click="handleConfirm">Save</el-button>
				<el-button class="bulk-form__button" @click="handleClose">Cancel</el-button>
			</el-form-item>
		</el-form>
	</el-dialog>
</template>

<script>
export default {
	emits: ['save', 'close'],
	data() {
		return {
			moneyMask: {
				decimal: '.',
				thousands: ',',
				prefix: '$ ',
				suffix: '',
				precision: 2
			},
			form: {
				stock_quantity: undefined,
				price: null
			}
		};
	},
	props: {
		visible: Boolean
	},
	methods: {
		handleClose() {
			this.$emit('close');
		},
		handleConfirm() {
			this.form.price = this.unmaskPrice(this.form.price);
			this.form = this.removeEmpty(this.form);
			this.$emit('save', this.form);
		},
		unmaskPrice(value) {
			return value.replace('$', '').replace(',', '').trim();
		},
		removeEmpty(obj) {
			// eslint-disable-next-line no-unused-vars
			return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
		},
		resetForm() {
			this.form = {
				stock_quantity: undefined,
				price: null
			};
		}
	},
	watch: {
		visible() {
			this.resetForm();
		}
	}
};
</script>

<style lang="scss">
	.el-input-number {
		width: 100% !important;
	}

	.bulk-form {
		&__footer {
			margin-bottom: 0px !important;
		}

		&__button {
			width: 100%;
			border-radius: 35px !important;
			margin: 10px 0 0 0 !important;
		}
	}
</style>
