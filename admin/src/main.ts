// Apollo
import { DefaultApolloClient } from '@vue/apollo-composable';
import apolloClient from '@/graphql/apollo-client';
// Element UI Plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// Vue instance
import { createApp, provide, h } from 'vue';
import App from './App.vue';
// Router
import router from './router';
// Vuex
import store from './store';

// Import the plugin here
import Auth from './auth';

async function init() {
  const AuthPlugin = await Auth.init({
    onRedirectCallback: (appState: any) => {
      router.push(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname);
    }
  });

  const app = createApp({
    setup() {
      provide(DefaultApolloClient, apolloClient);
    },

    render: () => h(App)
  });

  app
    .use(AuthPlugin)
    .use(router)
    .use(ElementPlus)
    .use(store)
    .mount('#app');
}

init();
