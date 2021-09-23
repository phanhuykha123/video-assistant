<template>
  <video
    ref="videoPlayer"
    :id="`my-video-${videoId}`"
    class="video-js vjs-theme-forest vjs-show-big-play-button-on-pause vjs-fill bg-video"
    controls
    data-setup="{}"
    :videoId="videoId"
  >
    <!-- <source src="@/assets/video.mp4" type="video/mp4" /> -->
  </video>
</template>

<script>
import videojs from 'video.js';
export default {
  props: ['videoId', 'videoURL'],
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
    this.player.src({ type: 'video/mp4', src: this.videoURL });
    this.player.on('play', () => {
      this.$emit('showTitle');
    });
  },
  beforeDestroy() {
    if (this.player) {
      setTimeout(() => {
        this.player.dispose();
      }, this.$store.getters['timeout']);
    }
  },
};
</script>
