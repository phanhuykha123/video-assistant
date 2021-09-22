<template>
	<video
		ref="videoPlayer"
		:id="`my-video-${videoId}`"
		class="video-js vjs-theme-forest vjs-show-big-play-button-on-pause vjs-fill bg-video"
		controls
		data-setup="{}"
		:videoId="videoId"
	>
		<source src="@/assets/video.mp4" type="video/mp4" />
	</video>
</template>

<script>
	import videojs from 'video.js';
	export default {
		props: ['videoId'],
		data() {
			return {
				player: null,
				isAnimated: false,
			};
		},
		mounted() {
			this.player = videojs(`my-video-${this.videoId}`, {
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
