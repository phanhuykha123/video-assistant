<template>
  <div class="form-container">
    <form action="" class="form-register" @submit.prevent="handleLogin">
      <el-row>
        <img src="../assets/welcome.png" alt="" class="form-image" />
        <el-col :span="24">
          <el-input placeholder="Insert your name to begin" v-model="name"></el-input>
        </el-col>
        <el-button type="primary" style="width: 100%; margin: 20px 0" @click="handleLogin"
          >Start</el-button
        >
        <el-button type="primary" style="width: 100%; margin: 5px 0">Go back</el-button>

        <el-col :span="24"> </el-col>
      </el-row>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  data() {
    return {
      name: '',
    };
  },
  computed: {
    ...mapGetters({
      node: 'chat/node',
    }),
  },
  methods: {
    ...mapActions({
      register: 'chat/register',
    }),
    handleLogin() {
      this.register(this.name);
    },
  },
};
</script>

<style scoped>
.form-container {
  position: relative;
  height: 100%;
}

.form-image {
  max-width: 100%;
}

.form-register {
  width: 80%;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
}
</style>
