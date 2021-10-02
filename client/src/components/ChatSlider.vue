<template>
  <div class="chat-carousel">
    <VueSlickCarousel v-bind="settings">
      <el-card
        class="product-item"
        v-for="(item, index) in productList.buttons"
        :key="index"
        @click.native="handleClickDetail(item)"
      >
        <img :src="item.thumb" class="product-thumb" id="product-thumb" />
        <div class="product-content">
          <p class="product-name">{{ item.text }}</p>
          <p class="product-price">${{ item.price }}</p>
          <p class="product-desc">
            {{ productDescFormat(item.description) }}
          </p>
        </div>
      </el-card>
    </VueSlickCarousel>
    <button class="btn-cancle" @click="handleGoBack">Cancle</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import VueSlickCarousel from 'vue-slick-carousel';

export default {
  props: ['productList'],
  components: { VueSlickCarousel },
  data() {
    return {
      settings: {
        arrows: false,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '20px',
      },
    };
  },
  computed: {
    ...mapGetters({
      userState: 'chat/userState',
      node: 'chat/node',
    }),
  },
  methods: {
    ...mapActions({
      getNode: 'chat/getNode',
    }),
    handleClickDetail(payload) {
      this.$store.dispatch('chat/getNode', payload);
    },
    async handleGoBack() {
      this.$store.commit('chat/SET_LIST_PRODUCTS', null);
    },
    productDescFormat(desc) {
      if (desc.length > 60) {
        return desc.substring(0, 60) + '...';
      }
      return desc;
    },
  },
  mounted() {
    this.$emit('handleStop');
  },
};
</script>

<style>
.carousel-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.chat-carousel {
  background-color: rgba(0, 0, 0, 0.767);
  height: 100%;
  width: 100%;
  text-align: center;
  padding: 45px 0px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 50;
}

.el-card__body {
  padding: 0;
}

.btn-cancle {
  margin-top: 10px;
  border: 1px solid #4f526b;
  border-radius: 10px;
  color: #fff;
  background-color: #0e134ad5;
  padding: 10px;
  width: 50%;
  outline: none;
  cursor: pointer;
  transition: all ease-in-out 0.3s;
}

.btn-cancle:hover {
  transform: scale(1.1);
  background-color: #141955e7;
}
</style>

<style scoped>
.product-item {
  width: 95% !important;
  text-align: center;
  border-radius: 10px;
  cursor: pointer;
}

.product-thumb {
  width: 100%;
  height: 300px;
  object-fit: cover;
  pointer-events: none;
}
.product-content {
  text-align: left;
  padding: 10px;
  cursor: grab;
}

.product-name {
  font-size: 16px;
  font-weight: bold;
  color: #707070;
}

.product-price {
  color: #ab2b34;
  margin: 10px 0;
  font-style: italic;
  font-weight: bold;
}

.product-desc {
  font-size: 14px;
}
</style>
