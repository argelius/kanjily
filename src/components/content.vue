<style lang="stylus">
  @import "global.styl"

  .content
    position absolute
    top $toolbar-height
    left 0
    right 0
    bottom 0
    overflow auto
</style>

<template>
  <div class="content">
    <slot></slot>
  </div>
</template>
