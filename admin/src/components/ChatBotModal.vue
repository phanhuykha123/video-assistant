<template>
  <el-dialog
    :title="modalTitle"
    v-model="dialogVisibleLocal"
    width="65%"
    :before-close="handleBeforeClose"
    :destroy-on-close="true"
  >
    <chat-bot-form ref="formAdd" />

    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleSubmitForm">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { useMutation } from '@vue/apollo-composable';
import { createNodeQuery, updateNodeQuery } from '../graphql/mutations';
import { computed, defineComponent, ref } from 'vue';
import ChatBotForm from './ChatBotForm.vue';
import { ElMessage } from 'element-plus';
import { ChatNode } from '../types/chatbot.interface';
import { useStore } from 'vuex';
import recordID from '../constants/database_record_id';

interface ChatFormData {
  name: string;
  text: string;
  button: [];
}

export default defineComponent({
  components: { ChatBotForm },
  setup() {
    const { mutate: createNode } = useMutation(createNodeQuery);
    const { mutate: updateNode } = useMutation(updateNodeQuery);

    const dialogVisibleLocal = ref(false);
    const chatName = ref('');

    const store = useStore();
    const editNode = computed(() => store.getters['chatbot/getEditNode']);
    const modalTitle = computed(() => {
      return editNode.value ? 'Edit chat' : 'Create new chat';
    });

    const open = () => {
      dialogVisibleLocal.value = true;
    };

    const setChatbotData = (payload: ChatNode[]) =>
      store.commit('chatbot/SET_CHATBOT_DATA', payload);

    const handleBeforeClose = (done: any) => {
      store.commit('chatbot/SET_EDIT_NODE', '');
      done();
    };

    return {
      store,
      dialogVisibleLocal,
      open,
      chatName,
      editNode,
      modalTitle,
      createNode,
      updateNode,
      setChatbotData,
      handleBeforeClose
    };
  },
  methods: {
    handleSubmitForm() {
      const formValues = (this.$refs.formAdd as any).submitForm('formChatBot');
      if (formValues) {
        if (this.editNode) {
          this.handleResetForm();

          this.updateNode({
            updateContentUpdatedNode: formValues,
            updateContentIdContent: recordID
          })
            .then((res: any) => {
              const newChatData: ChatNode[] = res.data.updateContent.content;
              this.setChatbotData(newChatData);

              ElMessage.success('Updated data success');
            })
            .catch((err) => {
              ElMessage.error(err.message);
            });
        } else {
          this.handleResetForm();

          this.createNode({
            createContentDto: formValues,
            createContentIdContent: recordID
          })
            .then((res: any) => {
              const newChatData: ChatNode[] = res?.data.createContent.content;

              this.setChatbotData(newChatData);
              ElMessage.success('Created data success');
            })
            .catch((err) => {
              ElMessage.error(err.message);
            });
        }
      } else {
        ElMessage.error('Please fill all fields');
      }
    },
    handleResetForm() {
      this.dialogVisibleLocal = false;
      (this.$refs.formAdd as any).resetForm('formChatBot');
      this.store.commit('chatbot/SET_EDIT_NODE', '');
    }
  }
});
</script>

<style lang="scss">
.el-dialog {
  margin-top: 10px !important;
}

.el-dialog__body {
  padding: 20px !important;
}

.chatBotModal {
  position: absolute;
  top: 10px;
}
</style>
