import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

Vue.prototype.$globalEvents = new Vue(); // Global event bus

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
