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
      transition all 0.2s linear
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
      activeIndex: {
        type: Number,
        default: 0
      }
    },

    watch: {
      activeIndex: function() {
        this.updateBar();
      }
    },

    ready: function() {
      this.updateBar();
      window.addEventListener('resize', this.updateBar);
    },

    beforeDestroy: function() {
      window.removeEventListener('resize', this.updateBar);
    },

    methods: {
      updateBar: function() {
        const tabElement = this.$children[this.activeIndex].$el;
        const rect = tabElement.getBoundingClientRect();

        this.position = {
          left: rect.left,
          width: rect.width
        };
      }
    }
  };
</script>
