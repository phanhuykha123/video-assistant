<template>
	<div class="chat-carousel">
		<VueSlickCarousel v-bind="settings">
			<el-card
				class="product-item"
				v-for="(item, index) in productList.buttons"
				:key="index"
				@click.native="handleClickDetail(item)"
			>
				<img
					src="https://my-test-11.slatic.net/p/9e4ad26c3febe13ecd370fe6fc84bfaf.jpg"
					class="product-thumb"
				/>
				<div class="product-content">
					<p class="product-name">Desktop Table VR 2021</p>
					<p class="product-price">$249.9</p>
					<p class="product-desc">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum reprehenderit maxime,
						doloremque
					</p>
				</div>
			</el-card>
		</VueSlickCarousel>
		<button class="btn-cancle" @click="handleGoBack">Cancle</button>
		<product-modal ref="productModal" />
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex';
	import VueSlickCarousel from 'vue-slick-carousel';
	import ProductModal from './ProductModal.vue';

	export default {
		props: ['productList'],
		components: { VueSlickCarousel, ProductModal },
		data() {
			return {
				settings: {
					arrows: false,
					infinite: false,
					autoplay: true,
					speed: 500,
					slidesToShow: 1,
					slidesToScroll: 1,
					centerMode: true,
					centerPadding: '20px',
				},
			};
		},
		computed: {
			...mapGetters({
				userState: 'chat/userState',
				node: 'chat/node',
			}),
			productDescFormat() {
				if (this.node.productDesc.length > 15) {
					return this.node.productDesc.substring(0, 15) + '...';
				}
				return this.node.productDesc;
			},
		},
		methods: {
			...mapActions({
				getNode: 'chat/getNode',
			}),
			handleClickDetail(payload) {
				console.log(payload);
				console.log('clicked');
				this.$refs.productModal.handleOpen();
				this.$store.dispatch('chat/getNode', payload);
			},
			async handleGoBack() {
				this.$store.commit('chat/SET_LIST_PRODUCTS', null);
			},
		},
	};
</script>

<style>
	.chat-carousel {
		position: absolute;
		height: 100%;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.432);
		text-align: center;
		padding: 30px 0px;
		top: 0;
		left: 0;
	}

	.el-card__body {
		padding: 0;
	}

	.btn-cancle {
		margin-top: 10px;
		border: 1px solid #4f526b;
		border-radius: 10px;
		color: #fff;
		background-color: #0e134ad5;
		padding: 10px;
		width: 50%;
		outline: none;
		cursor: pointer;
		transition: all ease-in-out 0.3s;
	}

	.btn-cancle:hover {
		transform: scale(1.1);
		background-color: #141955e7;
	}
</style>

<style scoped>
	.product-item {
		width: 95% !important;
		text-align: center;
		border-radius: 10px;
		cursor: pointer;
	}

	.product-thumb {
		width: 100%;
		height: 300px;
		object-fit: cover;
	}
	.product-content {
		text-align: left;
		padding: 10px;
	}

	.product-name {
		font-size: 18px;
		font-weight: bold;
		color: #707070;
	}

	.product-price {
		color: #ab2b34;
		margin: 10px 0;
		font-style: italic;
		font-weight: bold;
	}

	.product-desc {
		font-size: 14px;
	}
</style>
