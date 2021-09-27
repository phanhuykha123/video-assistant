<template>
	<div>
		<el-dialog
			title="PRODUCT DETAIL"
			width="70%"
			:visible.sync="dialogVisible"
			:before-close="handleClose"
		>
			<el-row class="product-item" :gutter="20">
				<el-col :span="12" class="product-item__image">
					<img
						src="https://images.pexels.com/photos/1042143/pexels-photo-1042143.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
						alt=""
						style="width:100% ; height: 65vh; object-fit: cover"
					/>
				</el-col>
				<el-col :span="12" class="product-item__content">
					<h1>Iphone XS Max 2020</h1>
					<p class="product-item__price">Price : 1000$</p>
					<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa tempora pariatur
						voluptatum nesciunt, delectus laboriosam porro expedita sit culpa nobis, accusantium quo
						sunt voluptate. Unde sint expedita explicabo earum cumque dicta hic autem quam nemo
						sapiente non maxime neque dolorum sequi blanditiis consectetur, error eveniet
						repellendus enim accusantium quas. Illum.
					</p>
				</el-col>
			</el-row>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">Cancel</el-button>
				<el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'ProductModal',
		data() {
			return {
				dialogVisible: false,
			};
		},
		methods: {
			handleClose(done) {
				this.$confirm('This will permanently close the modal. Continue?', 'Warning', {
					confirmButtonText: 'OK',
					cancelButtonText: 'Cancel',
					type: 'warning',
				})
					.then((_) => {
						done();
					})
					.catch((_) => {
						console.log('err');
					});
			},
			handleOpen() {
				this.dialogVisible = true;
			},
		},
	};
</script>

<style>
	.el-dialog {
		margin-top: 20px !important;
		border-radius: 10px;
		overflow: hidden;
	}

	.el-dialog__footer,
	.el-dialog__header {
		background: #ecf0f1;
	}
	.el-dialog__body {
		padding: 10px;
	}

	.el-dialog__header {
		text-align: center;
	}

	.el-dialog__header .el-dialog__title {
		font-size: 24px;
		font-weight: bold;
		color: #003a8c;
	}

	.product-item__content {
		line-height: 20px;
		padding: 10px 0;
	}

	.product-item__price {
		margin: 20px 0;
	}
</style>
