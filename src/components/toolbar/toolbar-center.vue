<style lang="stylus">
  @import "global.styl"

  .toolbar__center
    flex-grow 1
</style>

<template>
  <div class="toolbar__center">
    <slot></slot>
  </div>
</template>

<script>
  export default {
  };
</script>
