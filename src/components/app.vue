<style lang="stylus">
  @import "global.styl"
</style>

<template>
  <toolbar>
    <toolbar-center>
      Kanjily
    </toolbar-center>
    <toolbar-right>
      <toolbar-button icon="more_vert" v-on:click="menuShown = true"></toolbar-button>
    </toolbar-right>
  </toolbar>

  <game></game>

  <menu v-bind:is-shown="menuShown"
        v-bind:position="{top: '8px', right: '8px'}"
        v-on:hide="menuShown = false">
    <menu-item>About Kanjily</menu-item>
    <menu-item>Help</menu-item>
    <menu-item>Settings</menu-item>
  </menu>
</template>

<script>
  import Game from './game.vue';
  import {Toolbar, ToolbarLeft, ToolbarCenter, ToolbarRight, ToolbarButton} from './toolbar';
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
      'toolbar-left': ToolbarLeft,
      'toolbar-center': ToolbarCenter,
      'toolbar-right': ToolbarRight,
      'toolbar-button': ToolbarButton,
      'menu': Menu,
      'menu-item': MenuItem
    }
  };
</script>
