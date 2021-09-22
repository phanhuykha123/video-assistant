<template>
	<div>
		<video
			ref="videoPlayer"
			id="my-video"
			class="video-js vjs-theme-forest vjs-show-big-play-button-on-pause"
			controls
			data-setup="{}"
		>
			<source src="@/assets/video.mp4" type="video/mp4" />
		</video>
	</div>
</template>

<script>
	import videojs from 'video.js';

	export default {
		name: 'VideoPlayer',
		props: {
			options: {
				type: Object,
				default() {
					return {};
				},
			},
		},
		data() {
			return {
				player: null,
			};
		},
		mounted() {
			const video = videojs('my-video');
			console.log(video);
		},
		beforeDestroy() {
			if (this.player) {
				this.player.dispose();
			}
		},
	};
</script>

<style>
	#my-video {
		width: 500px;
		height: 500px;
	}
</style>
