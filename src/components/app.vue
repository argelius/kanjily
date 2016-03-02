<style lang="stylus">
  @import "global.styl"
</style>

<template>
  <toolbar>
    <toolbar-left>
      <toolbar-button icon="menu"></toolbar-button>
    </toolbar-left>
    <toolbar-center>
      Kanjily
    </toolbar-center>
    <toolbar-right>
      <toolbar-button icon="favorite"></toolbar-button>
      <toolbar-button icon="more_vert"></toolbar-button>
    </toolbar-right>
  </toolbar>

  <game></game>
</template>

<script>
  import Game from './game.vue';
  import {Toolbar, ToolbarLeft, ToolbarCenter, ToolbarRight, ToolbarButton} from './toolbar';

  export default {
    components: {
      'game': Game,
      'toolbar': Toolbar,
      'toolbar-left': ToolbarLeft,
      'toolbar-center': ToolbarCenter,
      'toolbar-right': ToolbarRight,
      'toolbar-button': ToolbarButton
    }
  };
</script>
