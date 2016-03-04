import Vue from 'vue';
import VueTouch from 'vue-touch';
import VueRouter from 'vue-router';

Vue.config.debug = true;

VueTouch.config.pan = {
  threshold: 2
};

Vue.use(VueTouch);
Vue.use(VueRouter);

const router = new VueRouter();

import Settings from './components/settings.vue';
import Home from './components/home.vue';

router.map({
  '/settings': {
    component: Settings
  }
});

router.start(Home, '#app');
