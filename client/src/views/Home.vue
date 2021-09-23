<template>
	<div class="home">
		<div class="chat-container">
			<transition name="fade">
				<span class="close-icon" @click="toggleChatBox" v-if="isShow">X</span>
			</transition>
			<transition name="fade">
				<div class="chat-box-container" v-if="isShow">
					<transition name="slide-up">
						<chat-box
							@closeChatBox="toggleChatBox"
							@onNextNode="handleNextNode"
							:key="title"
							:videoId="title"
						/>
					</transition>
				</div>
			</transition>
			<transition name="fade">
				<div class="chat-icon" @click="toggleChatBox" v-if="!isShow">
					<p>See example chat bot</p>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import ChatBox from '../components/ChatBox.vue';
	// import { useStore } from 'vuex';
	export default Vue.extend({
		name: 'Home',
		components: { ChatBox },
		data() {
			return {
				isShow: false,
				title: 1,
			};
		},
		computed: {
			url() {
				console.log(this.$store.getters['node'].data);
				return this.$store.getters['node'].data.url;
			},
		},
		methods: {
			toggleChatBox() {
				this.isShow = !this.isShow;
				this.$store.commit('SET_TIME_OUT', 0);
				this.$store.commit('SET_AUTO_PLAY', false);
			},
			async handleNextNode(payload) {
				await this.$store.dispatch('getNode', { data: payload });
				await this.$store.commit('SET_AUTO_PLAY', true);
				this.title += 1;
			},
		},
		mounted() {
			this.$store.dispatch('getNode', { data: 'conversation_start' });
		},
	});
</script>

<style>
	.chat-container {
		position: fixed;
		bottom: 20px;
		right: 40px;
		display: flex;
		width: 350px;
		height: 550px;
	}

	.chat-icon {
		position: absolute;
		right: 0;
		bottom: 0;
		width: 60%;
		padding: 50px;
		text-align: center;
		color: #fff;

		border-radius: 20px;
		border: 5px solid #1890ff;
		background-image: linear-gradient(rgba(0, 0, 0, 0.13), rgba(0, 0, 0, 0.24)),
			url('../assets/5f16c8991ce3203ce40fe83b_learn_n_dev_image_1.1.1.jpg');
		background-size: cover;
		box-shadow: 0 0 5px #cecece;

		cursor: pointer;
		transition: all 0.3s ease-in-out;
	}

	.chat-icon:hover {
		transform: scale(1.1);
	}

	.chat-box-container {
		width: 100%;
		height: 100%;
		position: relative;
		border-radius: 20px;
		overflow: hidden;
		background: black;
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: all 0.5s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
		transform: translateY(10px);
	}
</style>

<style scoped>
	.slide-up-enter-active,
	.slide-up-leave-active {
		transition: all 0.5s;
	}

	.slide-up-leave-to {
		transform: translateY(-100%);
	}
	.slide-up-enter {
		transform: translateY(100%);
	}
</style>
