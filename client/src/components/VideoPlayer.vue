<template>
  <div class="video-wrapper" :class="{ animated: isAnimated }">
    <div class="btn-audio">
      <img src="../assets/volume.png" alt="" v-if="!isMuted" @click="handleToggleVolume" />
      <img src="../assets/mute-speaker.png" alt="" v-else @click="handleToggleVolume" />
    </div>
    <video
      ref="videoPlayer"
      controls
      data-setup="{}"
      class="video-js vjs-theme-forest vjs-show-big-play-button-on-pause vjs-fill bg-video"
      :id="`${videoId}`"
      :videoId="videoId"
      :autoplay="autoplay"
    ></video>
  </div>
</template>

<script>
import videojs from 'video.js';
import { mapGetters } from 'vuex';
export default {
  props: ['videoId', 'videoURL', 'isAnimated'],
  data() {
    return {
      player: null,
      isMuted: false,
    };
  },
  computed: {
    ...mapGetters({
      autoplay: 'chat/autoplay',
      timeout: 'chat/timeout',
    }),
  },
  methods: {
    handleToggleVolume() {
      this.isMuted = !this.isMuted;
      this.player.muted(this.isMuted);
    },
  },
  mounted() {
    this.player = videojs(this.videoId, {
      fill: true,
    });

    console.log(this.player);

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

<style>
.video-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.btn-audio {
  position: absolute;
  top: 15px;
  left: 15px;
  cursor: pointer;
  z-index: 9999;
  opacity: 0;
}

.bg-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.5s ease-in-out;
}

.video-wrapper.animated .bg-video {
  opacity: 0.7;
}
.video-wrapper.animated .btn-audio {
  animation: fadeIn 0.5s ease-in-out forwards;
}

/* Overdrive Player CSS */

.vjs-control-bar {
  display: none !important;
}

.video-js .vjs-tech {
  object-fit: cover !important;
  border-radius: 20px;
}
</style>
