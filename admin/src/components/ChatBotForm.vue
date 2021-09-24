<template>
  <el-form
    label-position="top"
    :model="formData"
    ref="formChatBot"
    label-width="5px"
    :rules="rules"
  >
    <el-row :gutter="10">
      <el-col :span="24">
        <el-form-item label="Chat Name" prop="name">
          <el-input v-model="formData.name" placeholder="Ex: conversation_start..."></el-input>
        </el-form-item>
        <el-form-item label="Chat Text" prop="text">
          <el-input v-model="formData.text" placeholder="Ex: Welcome to my store..."></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <!-- Form Buttons -->
    <el-row>
      <span class="form-label">Chat buttons</span>

      <el-col :span="24" class="button-group">
        <!-- Button Item -->
        <transition-group name="list">
          <div
            class="button-item list-item "
            v-for="(button, index) in formData.buttons"
            :key="index"
          >
            <div class="button-title">
              <span>Button {{ index + 1 }}</span>
              <span class="close-button" @click="deleteButton(index)">
                <i class="el-icon-close"></i>
              </span>
            </div>
            <el-form-item label="Button Text">
              <el-input v-model="button.text"></el-input>
            </el-form-item>
            <el-row :gutter="10">
              <el-col :span="12">
                <el-form-item label="Button Event">
                  <el-select
                    v-model="button.event"
                    @change="handleChangeEventButton(button.event, index)"
                    placeholder="Select button event..."
                    style="width:100%"
                  >
                    <el-option
                      v-for="item in buttonEvents"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="Button Data" v-if="button.event == 'capture'">
                  <el-select
                    :disabled="button.event.length < 1"
                    v-model="button.data.next"
                    placeholder="Select button data..."
                    style="width:100%"
                    @change="handleChangeButtonSelectData(index, button.data.next)"
                  >
                    <el-option
                      v-for="item in nodeDatas"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="Button Data" v-else>
                  <el-select
                    :disabled="button.event.length < 1"
                    v-model="button.data"
                    placeholder="Select button data..."
                    style="width:100%"
                    @change="handleChangeButtonSelectData(index, button.data)"
                  >
                    <el-option
                      v-for="item in nodeDatas"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="10" style="marginBottom : 20px">
              <el-col
                :span="24"
                v-if="
                  button.nextNodeConditionsData &&
                    button.nextNodeConditionsData.conditions.length > 0
                "
              >
                <p style="textAlign:center; marginBottom:20px">Next Node Condittions</p>

                <el-table
                  :data="button.nextNodeConditionsData.conditions"
                  border
                  style="width: 100%"
                >
                  <el-table-column prop="property" label="Key"> </el-table-column>
                  <el-table-column prop="value" label="Value"> </el-table-column>
                  <el-table-column prop="operator" label="Operator"> </el-table-column>
                </el-table>
              </el-col>
            </el-row>

            <el-row v-if="button.event == 'capture'" :gutter="10">
              <el-col :span="24">
                <p style="textAlign:center; marginBottom:20px">Capture Data</p>
              </el-col>

              <el-col :span="12">
                <el-form-item>
                  <el-input placeholder="Key..." v-model="button.data.key"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <el-input placeholder="Value..." v-model="button.data.value"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </transition-group>
        <!-- End Button Item -->

        <!-- Add Button -->
        <div style="textAlign:center ;">
          <el-button type="primary" plain @click="addButton">
            <i class="el-icon-plus"></i> Add Button
          </el-button>
        </div>
        <!-- End Add Button -->
      </el-col>
    </el-row>

    <!-- Form Conditions -->
    <el-row style="marginTop:20px">
      <span class="form-label">Conditions</span>
      <!-- Condition Group -->
      <el-col :span="24" class="condition-group">
        <transition-group name="list">
          <!-- Condition Item -->
          <el-row
            class="condition-item"
            v-for="(condition, index) in formData.condition"
            :gutter="10"
            :key="index"
          >
            <el-col :span="24" class="button-title">
              <span>Condition {{ index + 1 }}</span>
              <span class="close-button" @click="deleteCondition(index)">
                <i class="el-icon-close"></i>
              </span>
            </el-col>

            <el-col :span="8">
              <el-form-item label="Property">
                <el-input placeholder="Ex:language_select" v-model="condition.property"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Value">
                <el-input placeholder="Ex: vi..." v-model="condition.value"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Operator">
                <el-select placeholder="Select operator..." v-model="condition.operator">
                  <el-option
                    v-for="item in conditionOperators"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- End Condition Item -->
        </transition-group>
        <!-- Add Button -->
        <div style="textAlign:center ;">
          <el-button type="primary" plain @click="addConditions">
            <i class="el-icon-plus"></i> Add Condition
          </el-button>
        </div>
        <!-- End Add Button -->
      </el-col>
      <!-- End Condition Group -->
    </el-row>

    <!-- Form Regex -->
    <el-row>
      <el-col :span="24">
        <el-form-item label="Regular Expression">
          <el-input placeholder="Regex..." v-model="formData.regex"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { ChatNode } from '../types/chatbot.interface';

export default defineComponent({
  setup() {
    const store = useStore();

    const chatbotData = computed(() => store.getters['chatbot/getChatbotData']);

    const rules = {
      name: [{ required: true, message: 'Please input chat name.', trigger: 'blur' }],
      text: [{ required: true, message: 'Please input chat text.', trigger: 'blur' }]
    };

    const editNode = computed(() => store.getters['chatbot/getEditNode']);

    const formData: any =
      editNode.value ||
      reactive({
        name: '',
        text: '',
        buttons: [],
        regex: '',
        condition: [],
        price: '',
        sub_text: '',
        thumb: ''
      });

    const buttonEvents = [
      {
        label: 'Capture',
        value: 'capture'
      },
      {
        label: 'Goto',
        value: 'goto'
      }
    ];

    const conditionOperators = [
      {
        label: '>',
        value: '>'
      },
      {
        label: '<',
        value: '<'
      },
      {
        label: '=',
        value: '='
      }
    ];

    const nodeDatas = chatbotData.value.map((node: ChatNode) => {
      return {
        label: node.name,
        value: node.name
      };
    });

    const addButton = () => {
      formData.buttons.push({
        text: '',
        event: '',
        data: {
          next: '',
          key: '',
          value: ''
        },
        nextNodeConditionsData: {
          name: '',
          conditions: []
        }
      });
    };

    const addConditions = () => {
      formData.condition.push({
        property: '',
        value: '',
        operator: ''
      });
    };

    const deleteButton = (id: number) => {
      formData.buttons.splice(id, 1);
    };

    const deleteCondition = (id: number) => {
      formData.condition.splice(id, 1);
    };

    const resetCondition = (index: number) => {
      formData.buttons[index].nextNodeConditionsData = {
        name: '',
        conditions: []
      };
    };

    const handleChangeEventButton = (event: string, index: number) => {
      resetCondition(index);

      if (event === 'goto') {
        formData.buttons[index].data = '';
      } else {
        formData.buttons[index].data = {
          next: '',
          key: '',
          value: ''
        };
      }
    };

    const handleChangeButtonSelectData = (index: number, payload: string) => {
      console.log(formData.buttons[index]);

      formData.buttons[index].nextNodeConditionsData.conditions = chatbotData.value.find(
        (node: any) => node.name === payload
      ).condition;
    };

    const getFormData = () => {
      const newButtons = formData.buttons.map((button: any) => {
        return {
          event: button.event,
          data: JSON.stringify(button.data),
          text: button.text
        };
      });
      return {
        ...formData,
        buttons: newButtons
      };
    };

    return {
      // Data
      formData,
      rules,
      buttonEvents,
      nodeDatas,
      // Methods
      addButton,
      addConditions,
      deleteButton,
      deleteCondition,
      handleChangeButtonSelectData,
      handleChangeEventButton,
      conditionOperators,
      getFormData
    };
  },
  methods: {
    submitForm(formName: string) {
      const form = this.$refs[formName] as any;
      let formData;
      form.validate((valid: boolean) => {
        if (valid) {
          formData = this.getFormData();
          this.resetForm(formName);
        } else {
          console.log('error submit!!');
          return false;
        }
      });

      return formData ? JSON.parse(JSON.stringify(formData)) : null;
    },
    resetForm(formName: string) {
      const form = this.$refs[formName] as any;
      form.resetFields();
      this.formData.buttons = [];
      this.formData.condition = [];
    }
  }
});
</script>

<style lang="scss" scoped>
.button-group,
.condition-group {
  padding: 20px;
  border: 1px solid #eee;

  .button-item,
  .condition-item {
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid #69c0ff;
  }
}
.form-label {
  margin-bottom: 20px;
}

.button-title {
  margin-bottom: 20px;
  text-align: center;
  text-transform: uppercase;
  color: #40a9ff;
  position: relative;

  .close-button {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    color: rgb(165, 163, 163);

    &:hover {
      color: #40a9ff;
    }
  }
}

.list-item {
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
