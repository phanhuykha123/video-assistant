<template>
  <el-container>
    <el-aside>
      <aside-component :isAsideCollapse="isAsideCollapse" />
    </el-aside>
    <el-container>
      <el-header>
        <header-component
          @collapseAsideClick="toggleAsideCollapse"
          :isAsideCollapse="isAsideCollapse"
        />
      </el-header>
      <el-main>
        <router-view v-slot="{ Component }">
          <transition name="fade">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import AsideComponent from '@/components/layouts/AsideComponent.vue';
import HeaderComponent from '@/components/layouts/HeaderComponent.vue';

import { defineComponent, Ref, ref } from 'vue';

export default defineComponent({
  name: 'Home',
  components: {
    AsideComponent,
    HeaderComponent
  },
  setup() {
    const isAsideCollapse: Ref<boolean> = ref(false);

    const toggleAsideCollapse = (data: boolean): void => {
      isAsideCollapse.value = data;
    };

    return {
      isAsideCollapse,
      toggleAsideCollapse
    };
  }
});
</script>

<style lang="scss">
.el-header {
  padding: 0;
  height: auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
