import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import vuetify from '@/plugins/vuetify'
import Alert from "@/components/Alert";
import Confirm from "@/components/Confirm";

Vue.component("Alert", Alert);
Vue.component("Confirm", Confirm);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
