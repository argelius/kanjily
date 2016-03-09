<style lang="stylus">
  @import "global.styl"

  .tab
    line-height $tabs-height
    color $tabs-text-color
    text-transform uppercase
    flex-grow 1
    text-align center
    user-select none
    cursor pointer

    @media (min-width: 480px)
      flex-grow 0
      padding 0 24px
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
