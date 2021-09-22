<template>
	<div class="home">
		<div class="chat-container">
			<transition name="fade">
				<chat-box v-if="isShow" @closeChatBox="toggleChatBox" />
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
			};
		},
		methods: {
			toggleChatBox() {
				this.isShow = !this.isShow;
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

	.fade-enter-active,
	.fade-leave-active {
		transition: all 0.5s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
		transform: translateY(10px);
	}
</style>
