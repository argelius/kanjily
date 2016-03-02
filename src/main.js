import Vue from 'vue';
import VueTouch from 'vue-touch';
import App from './components/app.vue';

Vue.config.debug = true;

VueTouch.config.pan = {
  threshold: 2
};

Vue.use(VueTouch);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    'app': App
  }
});
