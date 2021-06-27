<template>
    <el-form 
        @keyup.enter="onSubmit" 
        label-position="top" 
        :rules="rules" 
        ref="productForm" 
        :model="product" 
        label-width="120px"
        class="product-form"
    >
		<el-form-item label="Name" prop="name" class="product-form__input-label">
			<el-input v-model="product.name"></el-input>
		</el-form-item>

		<el-form-item label="Description" prop="description" class="product-form__input-label">
			<el-input v-model="product.description"></el-input>
		</el-form-item>

		<el-form-item label="SKU" prop="sku" class="product-form__input-label">
			<el-input v-model="product.sku"></el-input>
		</el-form-item>

		<el-form-item label="Barcode" prop="barcode" class="product-form__input-label">
			<el-input v-model="product.barcode"></el-input>
		</el-form-item>

		<el-row :gutter="20">
			<el-col :span="12">
				<el-form-item label="Price" prop="price" class="product-form__input-label">
					<el-input v-model.lazy="product.price" v-money="moneyMask"></el-input>
				</el-form-item>
			</el-col>

			<el-col :span="12">
				<el-form-item label="Stock Quantity" prop="stock_quantity" class="product-form__input-label">
					<el-input-number v-mask="'#######'" v-model="product.stock_quantity" :min="1" :max="1000000" />
				</el-form-item>
			</el-col>
		</el-row>

		<el-form-item class="product-form__footer">
			<el-button class="product-form__button" type="primary" @click="onSubmit">Save</el-button>
			<el-button class="product-form__button" @click="cancel">Cancel</el-button>
		</el-form-item>
    </el-form>
</template>

<script>
export default {
	name: 'ProductForm',
	props: {
		data: {}
	},
	data() {
		return {
			product: {
				name: '',
				description: '',
				sku: null,
				barcode: null,
				price: 0,
				stock_quantity: 1,
			},
			rules: {
				name: [
					{ required: true, message: 'This field is required', trigger: ['change', 'blur'] },
					{ min: 3, max: 50, message: 'Length should be 3 to 50', trigger: ['change', 'blur'] }
				],
				description: [
					{ required: true, message: 'This field is required', trigger: ['change', 'blur'] },
				],
				price: [
					{ required: true, message: 'This field is required', trigger: ['change', 'blur'] },
				],
				stock_quantity: [
					{ required: true, message: 'This field is required', trigger: ['change', 'blur'] },
				],
			},
			moneyMask: {
				decimal: '.',
				thousands: ',',
				prefix: '$ ',
				suffix: '',
				precision: 2
			}
		};
	},
	watch: {
		data(value) {
			this.product = value;
		}
	},
	methods: {
		onSubmit() {
			this.$refs['productForm'].validate((valid) => {
				if (valid) {
					this.product.price = this.unmaskPrice(this.product.price);
					this.$emit('saveProduct', this.product);
				}
			});
		},
		cancel() {
			this.$emit('cancel');
		},
		unmaskPrice(value) {
			return value.replace('$', '').replace(',', '').trim();
		}
	}
};
</script>

<style lang="scss">
    .product-form {
        .product-form__input-label {
            label {
                padding: 0;
            }
        }

		.el-input-number {
			width: 100%;
		}

        .product-form__footer {
            margin-bottom: 0px !important;

            .product-form__button {
                width: 100%;
                border-radius: 35px;
                margin: 10px 0 0 0 !important;
            }
        }

    }
</style>