<template>
  <div class="page-header">
    <div class="left-side">
      <div class="collapse-menu">
        <i
          class="el-icon-s-fold"
          @click="$emit('collapseAsideClick', true)"
          v-if="!isAsideCollapse"
        ></i>
        <i class="el-icon-s-unfold" @click="$emit('collapseAsideClick', false)" v-else></i>
      </div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/dash-board' }">Dashboard</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right-side">
      <el-dropdown>
        <span class="el-dropdown-link">
          <i class="el-icon-s-tools"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <router-link custom :to="'/dash-board/user'">Show profile </router-link>
            </el-dropdown-item>
            <el-dropdown-item divided @click="logout" v-if="isAuthenticated"
              >Logout</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
export default defineComponent({
  props: ['isAsideCollapse'],
  emits: ['collapseAsideClick'],
  setup() {
    const auth0: any = inject('Auth');
    const { isAuthenticated } = auth0;
    const logout = () => {
      auth0.logout({
        returnTo: window.location.origin
      });
    };
    return { logout, isAuthenticated };
  }
});
</script>

<style lang="scss">
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 10px;

  .left-side {
    display: flex;
    align-items: center;
    .collapse-menu {
      cursor: pointer;
      margin-right: 10px;
    }

    span {
      font-size: 16px;
    }

    i {
      font-size: 24px;
    }
  }
  .right-side {
    margin-right: 15px;
    i {
      font-size: 24px;
    }
  }
}
</style>
