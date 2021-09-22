<template>
	<div class="home">
		<div class="chat-container">
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
			<div class="chat-icon">
				<img
					src="@/assets/video.png"
					alt="chat-logo"
					class="chat-icon__logo"
					@click="toggleChatBox"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import ChatBox from '../components/ChatBox.vue';

	export default Vue.extend({
		name: 'Home',
		components: { ChatBox },
		data() {
			return {
				isShow: false,
				title: 1,
			};
		},
		methods: {
			toggleChatBox() {
				this.isShow = !this.isShow;
			},
			handleNextNode() {
				this.title += 1;
			},
		},
	});
</script>

<style>
	.chat-container {
		position: fixed;
		bottom: 20px;
		right: 0;
		display: flex;
		width: 450px;
		height: 550px;
	}

	.chat-icon {
		width: 20%;
		height: fit-content;
		align-self: flex-end;
		text-align: center;
		margin-left: auto;
	}
	.chat-icon__logo {
		width: 60%;
		cursor: pointer;
	}

	.chat-box-container {
		width: 80%;
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
