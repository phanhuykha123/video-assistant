<template>
  <video
    ref="videoPlayer"
    :id="`${videoId}`"
    class="video-js vjs-theme-forest vjs-show-big-play-button-on-pause vjs-fill bg-video"
    :class="{ animated: isAnimated }"
    controls
    data-setup="{}"
    :videoId="videoId"
    :autoplay="autoplay"
  >
    <!-- <source src="@/assets/video.mp4" type="video/mp4" /> -->
  </video>
</template>

<script>
import videojs from 'video.js';
import { mapGetters } from 'vuex';
export default {
  props: ['videoId', 'videoURL', 'isAnimated'],
  data() {
    return {
      player: null,
    };
  },
  computed: {
    ...mapGetters({
      autoplay: 'chat/autoplay',
      timeout: 'chat/timeout',
    }),
  },
  mounted() {
    this.player = videojs(this.videoId, {
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
      }, this.timeout);
    }
  },
};
</script>
