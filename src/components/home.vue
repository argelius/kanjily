<style lang="stylus">
  @import "global.styl"

  .home
    &__view
      transition all 0.5s ease

    .slide-up-enter
    .slide-up-leave
      transform translate3d(0, 5%, 0)
      opacity 0

</style>

<template>
  <div class="home">
    <div class="view">
      <toolbar>
        <toolbar-center>
          Kanjily
        </toolbar-center>
        <toolbar-right>
          <toolbar-button icon="more_vert" v-on:click="menuShown = true"></toolbar-button>
        </toolbar-right>
      </toolbar>

      <content>
        <game></game>
      </content>

      <menu v-bind:is-shown="menuShown"
            v-bind:position="{top: '8px', right: '8px'}"
            v-on:hide="menuShown = false">
        <menu-item v-link="{path: '/about'}" v-on:click="menuShown=false">About Kanjily</menu-item>
        <menu-item v-link="{path: '/help'}" v-on:click="menuShown=false">Help</menu-item>
        <menu-item v-link="{path: '/settings'}" v-on:click="menuShown=false">Settings</menu-item>
      </menu>
    </div>

    <router-view class="home__view" transition="slide-up" transition-mode="out-in"></router-view>
  </div>
</template>

<script>
  import Game from './game.vue';
  import Content from './content.vue';
  import {Toolbar, ToolbarCenter, ToolbarRight, ToolbarButton} from './toolbar';
  import {Menu, MenuItem} from './menu';

  export default {
    data: function() {
      return {
        menuShown: false
      };
    },

    components: {
      'game': Game,
      'toolbar': Toolbar,
      'toolbar-center': ToolbarCenter,
      'toolbar-right': ToolbarRight,
      'toolbar-button': ToolbarButton,
      'content': Content,
      'menu': Menu,
      'menu-item': MenuItem
    }
  };
</script>
