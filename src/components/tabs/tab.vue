<style lang="stylus">
  @import "global.styl"

  .tab
    line-height $tabs-height
    color $tabs-text-color
    text-transform uppercase
</style>

<template>
  <div class="tab">
    <slot></slot>
  </div>
</template>

<script>
  export default {
  };
</script>
