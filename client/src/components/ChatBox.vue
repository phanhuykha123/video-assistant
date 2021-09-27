<template>
	<div class="chat-box">
		<div class="chat-box__wrapper" v-show="false">
			<video-player
				@showTitle="showTitle"
				:videoId="videoId"
				:videoURL="url"
				:isAnimated="isAnimated"
				ref="myPlayer"
			/>

			<div class="chat-box__content">
				<div class="chat-bot__titles" :class="{ animated: isAnimated }">
					<p class="chat-bot__title--item">{{ node.data.videoTitle }}</p>
				</div>
			</div>
			<transition name="fade">
				<div class="buttons-group scroll-style" v-show="!isInput">
					<button
						class="button-item"
						round
						v-for="(button, index) in buttonData"
						:key="index"
						@click="handleNextNode(button)"
					>
						<span class="button-item__badge">{{
							String.fromCharCode(97 + index).toUpperCase()
						}}</span>
						<span class="button-text">{{ button.text }}</span>
					</button>
				</div>
			</transition>
			<transition name="fade">
				<form class="chat-input" v-show="isInput" @submit.prevent="handleUserCommand">
					<input
						type="text"
						v-model="chatCommand"
						placeholder="Type something..."
						id="userInput"
						autocomplete="off"
					/>
					<button type="submit">SEND</button>
				</form>
			</transition>
		</div>

		<chat-carousel />
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import ChatCarousel from './ChatCarousel.vue';
	import VideoPlayer from './VideoPlayer.vue';
	export default {
		components: { VideoPlayer, ChatCarousel },
		props: ['videoId'],
		name: 'ChatBox',
		data() {
			return {
				isAnimated: false,
				chatCommand: '',
				isInput: false,
				currentNode: null,
			};
		},
		computed: {
			...mapGetters({
				node: 'chat/node',
			}),
			buttonData() {
				return this.node.data.buttons;
			},
			url() {
				return this.node.data.videoUrl;
			},
		},
		methods: {
			handleCloseChatBox() {
				this.$emit('closeChatBox');
			},
			showTitle() {
				this.isAnimated = true;
			},
			handleNextNode(payload) {
				if (!payload.event.includes('input')) return this.$emit('onNextNode', payload);
				this.isInput = true;
				this.currentNode = payload;
				const videoPlayer = this.$refs.myPlayer.player;
				videoPlayer.pause();
			},
			handleUserCommand() {
				this.isInput = false;
				return this.$emit('onNextNode', { ...this.currentNode, command: this.chatCommand });
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

	.fade-enter-active,
	.fade-leave-active {
		transition: all 0.5s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
		transform: translateY(10px);
	}
</style>
