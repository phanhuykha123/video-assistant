<template>
  <div v-if="product">
    <el-dialog
      title="PRODUCT DETAIL"
      width="70%"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <el-row class="product-item" :gutter="20">
        <el-col :span="12" class="product-item__image">
          <img :src="product.thumb" alt="" style="width:100% ; height: 65vh; object-fit: cover" />
        </el-col>
        <el-col :span="12" class="product-item__content">
          <h1>{{ product.text }}</h1>
          <p class="product-item__price">Price : {{ product.price }}$</p>
          <p>
            {{ product.description }}
          </p>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleNextNode(product.buttons[0])">{{
          product.buttons[0].text
        }}</el-button>
        <el-button type="primary" @click="dialogVisible = false">{{
          product.buttons[1].text
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'ProductModal',
  data() {
    return {
      dialogVisible: false,
    };
  },
  computed: {
    ...mapGetters({
      node: 'chat/node',
      product: 'chat/productInfo',
    }),
  },
  methods: {
    handleClose(done) {
      this.$confirm('This will permanently close the modal. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      })
        .then(_ => {
          done();
        })
        .catch(_ => {
          console.log('err');
        });
    },
    handleOpen() {
      this.dialogVisible = true;
    },
    handleNextNode(payload) {
      // this.dialogVisible = true;
      // console.log(payload.data,payload.event);

      this.$store.dispatch('chat/getNode', payload);
      this.$store.commit('chat/SET_LIST_PRODUCTS', null);
    },
  },
};
</script>

<style>
.el-dialog {
  margin-top: 20px !important;
  border-radius: 10px;
  overflow: hidden;
}

.el-dialog__footer,
.el-dialog__header {
  background: #ecf0f1;
}
.el-dialog__body {
  padding: 20px;
  text-align: left;
}

.el-dialog__header {
  text-align: center;
}

.el-dialog__header .el-dialog__title {
  font-size: 24px;
  font-weight: bold;
  color: #003a8c;
}

.product-item__content {
  line-height: 20px;
  padding: 10px 0;
}

.product-item__price {
  margin: 20px 0;
  font-size: 24px;
  color: red;
}
</style>
