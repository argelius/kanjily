<style lang="stylus">
  @import "global.styl"
</style>

<template>
  <div class="settings view">
    <toolbar>
      <toolbar-left>
      <toolbar-button v-link="{path: '/'}" icon="arrow_back"></toolbar-button>
      </toolbar-left>
      <toolbar-center>About Kanjily</toolbar-center>
    </toolbar>

    <content>
      <p>About the app.</p>
    </content>
  </div>
</template>

<script>
  import {Toolbar, ToolbarCenter, ToolbarLeft, ToolbarButton} from './toolbar';
  import Content from './content.vue';

  export default {
    components: {
      'toolbar': Toolbar,
      'toolbar-center': ToolbarCenter,
      'toolbar-left': ToolbarLeft,
      'toolbar-button': ToolbarButton,
      'content': Content
    }
  };
</script>
