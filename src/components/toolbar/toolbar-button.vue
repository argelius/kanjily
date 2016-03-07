<style lang="stylus">
  @import "global.styl"

  .toolbar__button
    display inline-block
    position relative
    color $toolbar-button-text-color
    cursor pointer

    > i
      vertical-align -5px

    ripple()
      position absolute
      left 50%
      top 50%
      transform translate3d(-50%, -50%, 0)
      border-radius 50%
      width 80px
      height 80px
      background-color $toolbar-button-ripple-color

    &__ripple-1
      ripple()
      visibility hidden
      opacity 0
      transition opacity 0.3s linear

    :active > &__ripple-1
      opacity 1.0
      visibility visible
      transition opacity 0s linear

    &__ripple-2
      ripple()
      transform translate3d(-50%, -50%, 0) scale(0.0)
      transition transform 0s linear

    :active > &__ripple-2
      transform translate3d(-50%, -50%, 0) scale(1.0)
      transition transform 0.5s linear
      transition-delay 0.3s

  .toolbar__button + .toolbar__button
    margin-left 16px

</style>

<template>
  <div class="toolbar__button">
    <i class="material-icons">{{ icon }}</i>
    <div class="toolbar__button__ripple-1"></div>
    <div class="toolbar__button__ripple-2"></div>
  </div>
</template>

<script>
  export default {
    props: ['icon']
  };
</script>
