<template>
  <div>
    <h1>Test Auth</h1>
    <button @click="getAPI">Click me</button>
  </div>
</template>

<script>
import { inject } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    //    isAuthenticated: computed(() => state.isAuthenticated),
    // loading: computed(() => state.loading),
    // user: computed(() => state.user),
    // getIdTokenClaims,
    // getTokenSilently,
    // getTokenWithPopup,
    // handleRedirectCallback,
    // loginWithRedirect,
    // loginWithPopup,
    // logout
    const auth0 = inject('Auth');
    const store = useStore();
    const getInfo = (payload) => store.dispatch('auth/TestFunction', payload);
    const getAPI = async () => {
      const token = await auth0.getTokenSilently();
      getInfo(token);
    };

    return { getAPI };
  }
};
</script>

<style></style>
