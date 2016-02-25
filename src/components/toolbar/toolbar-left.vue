<style lang="stylus">
  @import "global.styl"

  .toolbar__left
    flex-basis 56px

    &:empty
      flex-basis 0px
</style>

<template>
  <div class="toolbar__left">
    <slot></slot>
  </div>
</template>

<script>
  export default {
  };
</script>
