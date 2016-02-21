import Vue from 'vue';
import VueTouch from 'vue-touch';
import {Game, Sentence, KanjiInput} from './components';

Vue.config.debug = true

VueTouch.config.pan = {
  threshold: 2
};

Vue.use(VueTouch);

new Vue({
  el: '#app',
  components: {
    'game': Game
  },
});
