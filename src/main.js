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

import Home from './components/home.vue';
import Game from './components/game.vue';
import Settings from './components/settings.vue';
import Help from './components/help.vue';
import About from './components/about.vue';

router.map({
  '/game': {
    component: Game
  },

  '/settings': {
    component: Settings
  },

  '/help': {
    component: Help
  },

  '/about': {
    component: About
  }
});

router.start(Home, '#app');
