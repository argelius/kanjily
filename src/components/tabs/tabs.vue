<style lang="stylus">
  @import "global.styl"

  .tabs
    background-color $tabs-background-color
    height $tabs-height
    display flex
</style>

<template>
  <div class="tabs">
    <slot></slot>
  </div>
</template>

<script>
  export default {
  };
</script>
