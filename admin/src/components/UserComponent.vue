<template>
  <div class="about">
    <h1>User Manager</h1>

    <div>
      <el-container>
        <el-aside>
          <el-scrollbar>
            <div
              class="user"
              :class="{ alert: user.isRequest, active: curUser && curUser.userID === user.userID }"
              v-for="user in users"
              :key="user.userID"
              @click="handleAcceptUserReq(user)"
            >
              <div class="user-name">{{ user.username }}</div>
              <div class="status">
                <status-icon :connected="user.connected" />
              </div>
            </div>
          </el-scrollbar>
        </el-aside>
        <el-container v-if="Object.keys(curUser).length > 0">
          <el-header>
            <div class="currentUser">
              <div class="curUsername">{{ curUser.username }}</div>
              <div class="setting">Setting</div>
            </div>
          </el-header>
          <el-main>
            <el-scrollbar>
              <div class="container-chat">
                <div v-for="(chat, i) in curUserChatArray" :key="i">
                  <div :class="chat.isUser ? 'isUser' : 'isAdmin'">
                    <i style="font-size:20px" class="el-icon-user-solid"></i>
                    <div class="message">{{ chat.message }}</div>
                  </div>
                </div>
              </div>
            </el-scrollbar>
          </el-main>
          <el-footer>
            <div class="form-input">
              <input
                type="text"
                name=""
                id=""
                class="input-text"
                v-model="message"
                @focus="typing"
              />
              <button class="btn-send" @click="sendMessage">Send</button>
            </div>
          </el-footer>
        </el-container>
        <div v-else style="width: 100%">
          <el-empty style="margin:0 auto" description="No user connect"></el-empty>
        </div>
      </el-container>
    </div>
  </div>
</template>

<script lang="ts">
import StatusIcon from './StatusIcon.vue';
import socket from '../socket/socket';
export default {
  name: 'Chat',
  components: { StatusIcon },
  data() {
    return {
      users: [],
      curUser: {},
      message: ''
    };
  },
  computed: {
    curUserChatArray() {
      const user = this.users.find((user) => user.userID === this.curUser.userID);
      return user.chatArr;
    }
  },
  methods: {
    handleAcceptUserReq({ userID }) {
      if (this.curUser.userID !== userID || this.curUser.isRequest) {
        const user = this.users.find((user) => user.userID === userID);
        this.curUser = user;
        if (user.isRequest) {
          user.isRequest = false;
          const adminName = 'Tai';
          socket.emit('acceptUser', {
            userID: user.userID,
            adminName,
            message: `Tôi tên là ${adminName}. Tôi có thể giúp gì cho bạn?`
          });
        }
      }
    },
    sendMessage() {
      const message = this.message;
      this.curUserChatArray.push({ message, isUser: false });
      const adminName = 'Tai';
      socket.emit('acceptUser', {
        userID: this.curUser.userID,
        adminName,
        message
      });
      this.message = '';
    },
    typing() {
      socket.emit('typing', this.curUser.userID);
    }
  },
  created() {
    socket.connect();
    socket.on('getAllUsers', (users) => {
      this.users = users;
    });
  },
  // After completely render
  mounted() {
    socket.on('user', (user) => {
      this.users.unshift(user);
    });

    socket.on('user disconnected', (id) => {
      const user = this.users.find((user) => user.userID === id);
      if (user) user.connected = false;
    });

    socket.on('request', ({ userID }) => {
      const user = this.users.find((user) => user.userID === userID);
      if (user) user.isRequest = true;
    });

    socket.on('getChatUser', ({ message, isUser }) => {
      console.log(message);
      this.curUserChatArray.push({ message, isUser });
    });
  },
  unmmounted() {
    socket.off('users');
    socket.off('request');
    socket.off('user disconnected');
    socket.off('getChatUser');
    // socket.off('private message');
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.about h1 {
  text-align: center;
  margin: 30px 0;
}
.about {
  width: 80%;
  margin: 0 auto;
}
.el-container {
  width: 100%;
}
.el-header {
  border-radius: 10px;
  border-bottom: 1px solid #d3dce6;
  /* border-radius: 10px; */
}

.el-footer {
  margin: 0;
  padding: 0;
  height: 40px !important;
}
.el-aside {
  padding: 60px 0;
  line-height: 60px;
  width: 19% !important;
  border-radius: 10px;
  border-right: 1px solid #d3dce6;
  max-height: 550px;
  overflow: hidden;
}

.el-main {
  height: 400px;
  overflow: hidden;
  /* padding: 0 20px; */
}

.el-scrollbar {
  margin: 20px 0;
  max-height: 470px;
  overflow-y: auto;
  /* padding: 0 20px; */
}

.user {
  width: 95%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
}

.user.alert {
  animation: alert 1s ease-in-out infinite;
}

.user.active {
  background: #409eff;
  color: #fff;
}

@keyframes alert {
  from {
    background: #fff;
  }
  to {
    background: rgb(247, 94, 94);
  }
}

.user:hover {
  width: 95%;
  background-color: #d3dce6;
  cursor: pointer;
}
.user .user-name {
  font-size: 20px;
}

.currentUser {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.form-input {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.form-input .input-text {
  height: 100%;
  width: 80%;
  border-radius: 10px;
  font-size: 20px;
  padding-left: 15px;
}
.input-text:focus-visible {
  outline: none;
}
.form-input .btn-send {
  height: 100%;
  width: 20%;
  border-radius: 20px;
}

.btn-send:hover {
  background-color: red;
}
.container-chat {
  width: 94%;
  /* max-height: 600px; */
  margin: 0 auto;
}

.isAdmin {
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  gap: 20px;
  line-height: 30px;
  margin-bottom: 10px;
}
.isAdmin i {
  color: #409eff;
}
.isAdmin .message {
  background-color: #409eff;
  padding: 15px;
  border-radius: 20px;
  color: #fff;
}
.isUser .message {
  background-color: #e4e7ed;
  padding: 15px;
  border-radius: 20px;
}
.isUser {
  display: flex;
  align-items: center;
  gap: 20px;
  line-height: 30px;
  margin: 10px;
}
</style>
