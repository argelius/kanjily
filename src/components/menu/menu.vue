<style lang="stylus">
  @import "global.styl"

  .menu
    position absolute
    min-width 168px
    material-shadow(1)
    visibility hidden

    &--shown
      visibility visible
</style>

<template>
  <div class="menu"
       v-bind:class="{
         'menu--shown': isShown
       }">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    ready: function() {
      this.$appendTo(document.body);
    },

    beforeDestroy() {
      this.$el.remove();
    },

    props: {
      isShown: {
        type: Boolean,
        default: false
      }
    }
  };
</script>
