<template>
	<div class="chat-box">
		<!-- <span class="close-icon" @click="handleCloseChatBox">X</span> -->
		<div class="chat-box__wrapper">
			<video-player @showTitle="showTitle" :videoId="videoId" />

			<div class="chat-box__content">
				<div class="chat-bot__titles" :class="{ animated: isAnimated }">
					<p class="chat-bot__title--item">Welcome to our website</p>
					<p class="chat-bot__title--item">What are you planning to do</p>
				</div>
			</div>

			<div class="buttons-group scroll-style">
				<button
					class="button-item"
					round
					v-for="(button, index) in 5"
					:key="button"
					@click="handleNextNode"
				>
					<span class="button-item__badge">{{
						String.fromCharCode(97 + index).toUpperCase()
					}}</span>
					<span class="button-text">Button 1</span>
				</button>
			</div>
		</div>
		<div class="loading" v-if="false">
			<div>
				<loading />
				<p style="color:#1890ff">Firing up...</p>
			</div>
		</div>
	</div>
</template>

<script>
	import Loading from './Loading.vue';
	import VideoPlayer from './VideoPlayer.vue';
	export default {
		components: { Loading, VideoPlayer },
		props: ['videoId'],
		name: 'ChatBox',
		data() {
			return {
				player: null,
				isAnimated: false,
			};
		},
		methods: {
			handleCloseChatBox() {
				this.$emit('closeChatBox');
			},
			showTitle() {
				this.isAnimated = true;
			},
			handleNextNode() {
				this.$emit('onNextNode');
			},
		},
	};
</script>

<style src="./ChatBox.css"></style>

<style scoped>
	/* Scroll 2 */
	.scroll-style::-webkit-scrollbar {
		width: 5px;
		height: 5px;
	}
	.scroll-style::-webkit-scrollbar-track {
		background-color: rgba(255, 255, 255, 0.1);
		border-radius: 10px;
	}
	.scroll-style::-webkit-scrollbar-thumb {
		background-color: #414649;
		border-radius: 10px;
	}
</style>
