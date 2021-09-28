<template>
	<div class="chat-carousel">
		<el-carousel trigger="click" class="video-carousel">
			<el-carousel-item v-for="(item, index) in node.data.buttons" :key="index">
				<div class="product-item">
					<img :src="item.thumb" alt="" class="product-thumb" />
					<h3 class="product-title">{{ item.text }}</h3>

					<el-button type="primary" style="width:80%" @click="handleClickDetail(item)"
						>DETAIL</el-button
					>
				</div>
			</el-carousel-item>
		</el-carousel>
		<img
			src="../assets/back-arrow.png"
			alt="go back"
			title="Back"
			class="back-icon"
			@click="handleGoBack"
		/>
		<product-modal ref="productModal" />
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex';
	import ProductModal from './ProductModal.vue';
	export default {
		components: { ProductModal },
		computed: {
			...mapGetters({
				userState: 'chat/userState',
				node: 'chat/node',
			}),
		},
		methods: {
			...mapActions({
				getNode: 'chat/getNode',
			}),
			handleClickDetail(payload) {
				this.$refs.productModal.handleOpen();
				this.$store.dispatch('chat/getNode', payload);
			},
			async handleGoBack() {
				await this.getNode({
					event: 'goto',
					data: `conversation_welcome${this.userState.language === 'vi' ? ':vi' : ''}`,
				});
			},
		},
	};
</script>

<style>
	.chat-carousel {
		position: relative;
		height: 100%;
	}
	.back-icon {
		position: absolute;
		top: 20px;
		left: 20px;
		z-index: 100;
		cursor: pointer;
		opacity: 0.9;
		transition: all 0.3s ease-in-out;
	}
	.back-icon:hover {
		transform: scale(1.2);
	}

	.video-carousel {
		height: 100%;
	}

	.el-carousel__container {
		height: 100%;
		background-color: #000;
	}
	.el-carousel__item h3 {
		font-size: 14px;
		opacity: 0.75;
		margin: 0;
		line-height: 110px;
	}
	.el-carousel__arrow {
		background-color: rgba(0, 0, 0, 0.76);
	}
</style>

<style scoped>
	.product-item {
		text-align: center;
	}

	.product-thumb {
		width: 100%;
		height: 320px;
		object-fit: cover;
		background-color: #000;
		opacity: 0.9;
	}

	.product-title {
		font-size: 24px;
		text-transform: uppercase;
		color: #fff;
	}
</style>
