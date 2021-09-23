<template>
  <div class="chat-box">
    <!-- <span class="close-icon" @click="handleCloseChatBox">X</span> -->
    <div class="chat-box__wrapper">
      <video-player
        @showTitle="showTitle"
        :videoId="videoId"
        :videoURL="url"
        :isAnimated="isAnimated"
      />

      <div class="chat-box__content">
        <div class="chat-bot__titles" :class="{ animated: isAnimated }">
          <p class="chat-bot__title--item">{{ node.data.title }}</p>
        </div>
      </div>

      <div class="buttons-group scroll-style">
        <button
          class="button-item"
          round
          v-for="(button, index) in buttonData"
          :key="button.data"
          @click="handleNextNode(button.data)"
        >
          <span class="button-item__badge">{{
            String.fromCharCode(97 + index).toUpperCase()
          }}</span>
          <span class="button-text">{{ button.text }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import VideoPlayer from './VideoPlayer.vue';
export default {
  components: { VideoPlayer },
  props: ['videoId'],
  name: 'ChatBox',
  data() {
    return {
      isAnimated: false,
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
      return this.node.data.url;
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
      this.$emit('onNextNode', payload);
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
