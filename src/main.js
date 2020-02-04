import Vue from 'vue'
import ElementUI from 'element-ui' //新添加
import 'element-ui/lib/theme-chalk/index.css' //新添加
import App from './App.vue'

Vue.use(ElementUI)   //新添加
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
