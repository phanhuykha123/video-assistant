<template>
	<video
		ref="videoPlayer"
		id="my-video"
		class="video-js vjs-theme-forest vjs-show-big-play-button-on-pause vjs-fill bg-video"
		controls
		data-setup="{}"
	>
		<source src="@/assets/video.mp4" type="video/mp4" />
	</video>
</template>

<script>
	import videojs from 'video.js';
	export default {
		data() {
			return {
				player: null,
				isAnimated: false,
			};
		},
		mounted() {
			this.player = videojs('my-video', {
				fill: true,
			});
			this.player.on('play', () => {
				this.$emit('showTitle');
			});
		},
		beforeDestroy() {
			if (this.player) {
				this.player.dispose();
			}
		},
	};
</script>
