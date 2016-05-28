<style lang="stylus">
  @import "global.styl"

  .tabs
    background-color $tabs-background-color
    height $tabs-height
    display flex
    flex-wrap nowrap

    &__bar
      background-color white
      position absolute
      height 2px
      margin-top $tabs-height - 2
</style>

<template>
  <div class="tabs">
    <slot></slot>
    <div class="tabs__bar" v-bind:style="{
      left: position.left + 'px',
      width: position.width + 'px'
    }"></div>
  </div>
</template>

<script>
  const between = (val, low, high) => (
    Math.min(high, Math.max(low, val))
  );

  const interpolate = (a, b, r) => (
    a * (1 - r) + b * r
  );

  export default {
    data: function() {
      return {
        position: {
          left: 0,
          width: 0
        }
      };
    },

    props: {
      index: {
        type: Number,
        default: 0
      }
    },

    watch: {
      index: 'updateBar'
    },

    ready: function() {
      this.rects = this.calculateRects();
      this.updateBar();
      window.addEventListener('resize', this.onResize);
    },

    beforeDestroy: function() {
      window.removeEventListener('resize', this.onResize);
    },

    methods: {
      onResize: function() {
        this.rects = this.calculateRects();
        this.updateBar();
      },

      calculateRects: function() {
        return this.$children.map((child) => child.$el.getBoundingClientRect());
      },

      updateBar: function() {
        let a = Math.floor(this.index);
        let b = Math.ceil(this.index);

        a = between(a, 0, this.$children.length - 1);
        b = between(b, 0, this.$children.length - 1);

        this.position = {
          left: interpolate(this.rects[a].left, this.rects[b].left, this.index % 1),
          width: interpolate(this.rects[a].width, this.rects[b].width, this.index % 1)
        };
      }
    }
  };
</script>
