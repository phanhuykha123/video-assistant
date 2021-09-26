import { createStore } from 'vuex';
import auth from './modules/auth';
import chatbot from './modules/chatbot';
export default createStore({
  modules: {
    auth,
    chatbot
  }
});
