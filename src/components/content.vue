<style lang="stylus">
  @import "global.styl"

  .content
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    overflow auto

  .toolbar + .content
    top $toolbar-height

  .toolbar + .tabs + .content
    top $toolbar-height + $tabs-height

  .tabs + .content
    top $tabs-height
</style>

<template>
  <div class="content">
    <slot></slot>
  </div>
</template>
