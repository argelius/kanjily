<style lang="stylus">
  @import "global.styl"

  .toolbar__right
    display flex
    flex-wrap nowrap
    text-align right
</style>

<template>
  <div class="toolbar__right">
    <slot></slot>
  </div>
</template>

<script>
  export default {
  };
</script>
