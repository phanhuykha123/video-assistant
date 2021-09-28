<template>
  <el-form class="user-form" label-position="top">
    <el-row>
      <el-col :span="24" class="form-title">
        <h3>checkout</h3>
      </el-col>

      <el-col :span="24">
        <el-form-item label="Address">
          <el-input v-model="formData.address" placeholder="Input your address...." />
        </el-form-item>
      </el-col>

      <el-col :span="24">
        <el-form-item label="Phone Number">
          <el-input v-model="formData.phone" placeholder="Input your address...." />
        </el-form-item>
      </el-col>

      <el-col :span="24">
        <el-button type="primary" style="width: 100%" @click="order">
          Submit
        </el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import {mapActions, mapMutations} from "vuex";

export default {
  data() {
    return {
      formData: {
        address: '',
        phone: '',
      },
    };
  },
  methods:{
    ...mapActions({
      orderItem: 'chat/orderItem',
    }),
    ...mapMutations({
      setAutoplay: 'chat/SET_AUTO_PLAY',
    }),
    async order() {
      console.log('data', this.formData);
      await this.orderItem(this.formData);
      this.setAutoplay(true);
    }
  }
};
</script>

<style>
.user-form {
  width: 100%;
  height: 100%;
  padding: 15px;
}

.form-title {
  text-align: center;
  text-transform: uppercase;
  font-size: 24px;
  margin-bottom: 20px;
}
</style>
