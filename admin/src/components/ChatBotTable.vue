<template>
  <el-table :data="tableData" style="width: 100%" border>
    <el-table-column label="Chat ID" width="180">
      <template #default="scope">
        <span style="margin-left: 10px">{{ scope.row.name }}</span>
      </template>
    </el-table-column>

    <el-table-column label="Chat Text" width="360">
      <template #default="scope">
        <span>{{ scope.row.text || '-' }}</span>
      </template>
    </el-table-column>

    <el-table-column label="Chat Regex">
      <template #default="scope">
        <el-tag type="warning">{{ scope.row.regex || '-' }}</el-tag>
      </template>
    </el-table-column>

    <el-table-column label="Chat Buttons">
      <template #default="scope">
        <el-space wrap v-if="scope.row.buttons.length > 0">
          <el-tag v-for="(button, index) in scope.row.buttons" :key="index">
            {{ button?.text || '-' }}
          </el-tag>
        </el-space>
        <el-tag v-else>-</el-tag>
      </template>
    </el-table-column>

    <el-table-column label="Operations">
      <template #header>
        <el-input v-model="search" size="mini" placeholder="Type to search" />
      </template>
      <template #default="scope">
        <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)"
          >Edit</el-button
        >
        <el-popconfirm
          title="Are you sure to delete this?"
          @confirm="confirmEvent(scope.$index, scope.row)"
        >
          <template #reference>
            <el-button size="mini" type="danger">Delete</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { useMutation } from '@vue/apollo-composable';
import { computed, defineComponent, ref } from '@vue/runtime-core';
import { deleteNodeQuery } from '../graphql/mutations';
import recordID from '../constants/database_record_id';
import { useStore } from 'vuex';
import { ChatNode } from '../types/chatbot.interface';
import { ElMessage } from 'element-plus';

export default defineComponent({
  props: {
    tableData: { type: Array, default: () => [], required: true }
  },
  emits: ['onEdit'],
  setup(props, { emit }) {
    const store = useStore();

    const setChatbotData = (payload: ChatNode[]) =>
      store.commit('chatbot/SET_CHATBOT_DATA', payload);

    const search = ref('');

    const { mutate: deleteChatNode } = useMutation(deleteNodeQuery);

    const confirmEvent = (index: number, row: ChatNode) => {
      deleteChatNode({
        deleteContentIdContent: recordID,
        deleteContentName: row.name
      })
        .then((res) => {
          const newChatbotData: ChatNode[] = res?.data.deleteContent.content;
          setChatbotData(newChatbotData);
          ElMessage.success('Delete Successfully');
        })
        .catch((err) => {
          ElMessage.error(err.message);
        });
    };

    const handleEdit = (index: number, row: ChatNode) => {
      store.commit('chatbot/SET_EDIT_NODE', row.name);
      emit('onEdit');
    };

    return { search, confirmEvent, handleEdit };
  }
});
</script>

<style></style>
