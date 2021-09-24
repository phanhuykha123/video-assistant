<template>
  <div class="container">
    <div v-if="!loading">
      <!-- show login when not authenticated -->
      <button v-if="!isAuthenticated" @click="login" class="btn-connect">Connect Chatbot!!</button>
      <!-- show logout when authenticated -->
      <button v-if="isAuthenticated" @click="logout" class="btn-connect">Log out</button>
    </div>
    <div v-else>
      <img
        src="https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif"
        alt="Waiting for few seconds"
      />
    </div>
  </div>
</template>

<script>
import { inject } from 'vue';
export default {
  setup() {
    const auth0 = inject('Auth');

    const { isAuthenticated, loading } = auth0;

    const login = () => {
      auth0.loginWithRedirect();
    };

    return { login, isAuthenticated, loading };
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-connect {
  background: #ee9ca7; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #ffdde1, #ee9ca7); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #ffdde1,
    #ee9ca7
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  font-size: 40px;
  padding: 20px;
  border-radius: 10px;
}

.btn-connect:hover {
  background: #000000; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #434343, #000000); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #434343,
    #000000
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  color: #fff;
}
</style>
