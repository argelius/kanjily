<style lang="stylus">
  @import "global.styl"
</style>

<template>
  <div class="settings view">
    <toolbar>
      <toolbar-left>
      <toolbar-button v-link="{path: '/'}" icon="arrow_back"></toolbar-button>
      </toolbar-left>
      <toolbar-center>Settings</toolbar-center>
    </toolbar>

    <content>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
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
