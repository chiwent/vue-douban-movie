// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from "vue-resource"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import BackToTop from 'vue-backtotop'

Vue.config.productionTip = false


Vue.use(BackToTop)
Vue.use(VueResource);
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { App },
    template: '<App/>'
})