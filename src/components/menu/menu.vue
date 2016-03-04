<style lang="stylus">
  @import "global.styl"

  .menu
    background-color $menu-background-color
    border-radius 2px
    position absolute
    min-width 168px
    material-shadow(1)
    padding 8px 0
    transition all 0.1s linear
    transition-delay 0.02s
    opacity 0
    overflow hidden
    pointer-events none

    &--shown
      opacity 1
      pointer-events auto

</style>

<template>
  <div class="menu"
       v-bind:class="{
         'menu--shown': isShown
       }"
       v-bind:style="{
         top: position.top || 'auto',
         left: position.left || 'auto',
         bottom: position.bottom || 'auto',
         right: position.right || 'auto'
       }">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    ready: function() {
      this.$appendTo(document.body);
      document.addEventListener('click', this.onClick, true);
    },

    beforeDestroy() {
      this.$el.remove();
      document.removeEventListener('click', this.onClick, true);
    },

    props: {
      isShown: {
        type: Boolean,
        default: false
      },
      position: {
        type: Object
      }
    },

    watch: {
      isShown: function(val) {
        if (val) {
          this.$dispatch('show');
        }
        else {
          this.$dispatch('hide');
        }
      }
    },

    methods: {
      onClick: function(e) {
        let element = e.target;

        while (element !== null) {
          if (element === this.$el) {
            return;
          }

          element = element.parentNode;
        }

        // Click outside.
        this.isShown = false;
      }
    }
  };
</script>
