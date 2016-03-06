<style lang="stylus">
  @import "global.styl"

  .menu__item
    padding 14px 16px
    font-size 17px
    cursor pointer
    user-select none
    transition background-color 0.2s ease

    &:active
    &:hover
      background-color $menu-item-active-color
</style>

<template>
  <div class="menu__item">
    <slot></slot>
  </div>
</template>

<script>
  export default {
  };
</script>
